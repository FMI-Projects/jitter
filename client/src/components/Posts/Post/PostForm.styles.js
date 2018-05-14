import baseStyles from "../../UI/Forms/BaseForm/BaseForm.styles";

const styles = {
  ...baseStyles,
  card: {
    ...baseStyles.card,
    marginBottom: -70,
    width: "20%"
  },
  form: {
    ...baseStyles.form,
    width: "100%",
    marginBottom: 90
  },
  textField: {
    ...baseStyles.textField,
    width: "80%"
  },
  cardTitle: {
    ...baseStyles.cardTitle,
    textAlign: "center"
  },
  headline: {
    width: "73%",
    marginLeft: "auto",
    marginTop: 10,
    height: "70%"
  }
};

export default styles;
