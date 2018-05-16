import red from "material-ui/colors/red";

const styles = theme => ({
  card: {
    maxWidth: 600,
    marginLeft: "28%",
    marginTop: "2%"
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
  avatar: {
    backgroundColor: red[500]
  },
  link: {
    textDecoration: "none"
  }
});

export default styles;
