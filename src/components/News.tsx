import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";

import * as moment from "moment";

interface Props {
  news: any
}

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const News = ({news} : Props) => {

  return (
    <Card variant="outlined" >
      <CardContent>
        <Typography variant="h5" component="h2">
          News
        </Typography>
        <br/>
        <List>
          {news.map((article: any, index: number) => {
            return (
              <ListItemLink key={index} href={article.url} >
                {article.url && (
                  <>
                    <ListItemText
                      primary={article.title}
                      secondary={moment(article.created_at).calendar()}
                    />
                  </>
                )}
              </ListItemLink>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default News;
