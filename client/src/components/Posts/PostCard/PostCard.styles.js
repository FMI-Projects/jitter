const styles = theme => ({
  card: {
    minWidth: "75%",
    marginLeft: "10%",
    marginTop: "0.7%",
    width: "25%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  link: {
    textDecoration: "none"
  },
  menu: {
    width: "10%"
  }
});

export default styles;
