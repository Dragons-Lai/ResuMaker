export const VIEW_MODE = "view";
export const EDIT_MODE = "edit";
export const DEFAULT_CHUNK_VALUE = {
  // type1: {
  //   text: "default",
  // },
  // type2: {
  //   text: "H2 Header"
  // },
  // type3: {
  //   title: "Title",
  //   companyName: "Company name",
  //   duration: "Duration",
  //   description: "Description",
  // },
  infoChunk_1: {
    title: "Title",
    content: "Content",
    icon_pair: [
      {
        icon: "PhoneFilled",
        text: "Your phone",
        hyperLink: "",
      },
    ],
  },
  bpChunk_1: {
    text: [
      ["BulletPoint", "1. \n2. \n3. "],
      ["BulletPoint", "1. \n2. \n3. "],
    ],
  },
  bpChunk_2: {
    text: [
      ["BulletPoint", "1. \n2. \n3. "],
      ["BulletPoint", "1. \n2. \n3. "],
      ["BulletPoint", "1. \n2. \n3. "],
    ],
  },
  mtChunk_1: {
    text: "MainTitle",
  },
  mcChunk_1: {
    text: "MainContent",
  },
  lineChunk_1: {
    text: null,
  },
};
