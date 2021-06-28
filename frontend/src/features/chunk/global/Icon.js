import { PhoneFilled, MailFilled, LinkedinFilled, GithubFilled, WarningFilled } from "@ant-design/icons";

export const iconKeyList = ["PhoneFilled", "MailFilled", "LinkedinFilled", "GithubFilled"];

export default function Icon({ type, style }) {
  switch (type) {
    case "PhoneFilled":
      return <PhoneFilled style={style} />;
    case "MailFilled":
      return <MailFilled style={style} />;
    case "LinkedinFilled":
      return <LinkedinFilled style={style} />;
    case "GithubFilled":
      return <GithubFilled style={style} />;
    default:
      return <WarningFilled style={style} />;
  }
}
