import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Tabs, Input, Row, Col, Divider, message } from "antd";
import { EditFilled, PlusOutlined, DeleteFilled } from "@ant-design/icons";

import { updateChunk } from "../../resume/resumeSlice";
import "./InfoChunk_1.css";
import "../global/config.css";
import Icon, { iconKeyList } from "../global/Icon";

const { TabPane } = Tabs;
const { TextArea } = Input;

const DEFAULT_ICON_PAIR = {
  icon: "MailFilled",
  text: "XXXXX@gmail.com",
};

const BUTTON_MENU_STYLE = {
  fontSize: "1em",
};

export default ({ chunk, id }) => {
  const dispatch = useDispatch();
  const [iconSelectIcon, setIconSelectIcon] = useState("");
  const [visible, setVisible] = useState(false);

  const [selectIconPair, setSelectIconPair] = useState(null);
  const [title, setTitle] = [
    chunk.value.title,
    (data) => {
      dispatch(updateChunk(id, data, ["title"]));
    },
  ];
  const [content, setContent] = [
    chunk.value.content,
    (data) => {
      dispatch(updateChunk(id, data, ["content"]));
    },
  ];
  const [iconPair, setIconPair] = [
    chunk.value.icon_pair,
    (data) => {
      dispatch(updateChunk(id, data, ["icon_pair"]));
    },
  ];

  return (
    <div className="info-chunk_1 chunk" id={id}>
      <TextArea autoSize={{ maxRows: 1000 }} bordered={false} className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextArea autoSize={{ maxRows: 1000 }} bordered={false} className="content" value={content} onChange={(e) => setContent(e.target.value)} />

      <Row className="info-chunk_1 icon-pair-list">
        {iconPair.map((item, i) => {
          return (
            <div className="info-chunk_1 icon-pair-wrapper" key={i}>
              {/*key不知道可不可以用 idx*/}
              <div className="info-chunk_1 icon-pair">
                <Icon type={item.icon} style={{ padding: "0 5px" }}></Icon>
                <input
                  value={item.text}
                  onChange={(e) => {
                    var newIconPair = iconPair.map((map_item) => ({ ...map_item }));
                    newIconPair[i].text = e.target.value;
                    setIconPair(newIconPair);
                  }}
                  size={item.text.length * 1.25}
                />
              </div>
              <Row className="info-chunk_1 hover-button-menu">
                <Row>
                  {/* <div style={{ padding: "0 3px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-right" viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
                      />
                    </svg>
                  </div> */}
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelectIconPair(i);
                      setIconSelectIcon(item.icon);
                      setVisible(true);
                    }}
                    icon={<EditFilled style={BUTTON_MENU_STYLE} />}
                  ></Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      var newIconPair = [...iconPair.slice(0, i + 1), { ...DEFAULT_ICON_PAIR }, ...iconPair.slice(i + 1, iconPair.length)];
                      setIconPair(newIconPair);
                    }}
                    icon={<PlusOutlined style={BUTTON_MENU_STYLE} />}
                  ></Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      if (iconPair.length > 1) setIconPair(iconPair.filter((filter_item, filter_i) => filter_i !== i));
                      else message.error("Delete Error! You should at least have one icon pair. ");
                    }}
                    icon={<DeleteFilled style={BUTTON_MENU_STYLE} />}
                  ></Button>
                </Row>
              </Row>
            </div>
          );
        })}
      </Row>
      <Modal
        centered
        visible={visible}
        onOk={() => {
          var newIconPair = iconPair.map((map_item) => ({ ...map_item }));
          newIconPair[selectIconPair] = Object.assign(newIconPair[selectIconPair], {
            icon: iconSelectIcon,
          });
          setIconPair(newIconPair);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Tabs type="card">
          <TabPane tab="Icon" key="icon">
            <Row justify="left" align="middle">
              {iconKeyList.map((iconType, i) => {
                var iconStyle = { fontSize: "22px" };
                var colStyle = {};
                if (iconSelectIcon !== null && iconSelectIcon === iconType) {
                  colStyle["backgroundColor"] = "rgb(146, 195, 241)";
                }

                return (
                  <Col
                    span={4}
                    className="info-chunk_1 icon-selection"
                    key={i}
                    style={colStyle}
                    onClick={() => {
                      setIconSelectIcon(iconType);
                    }}
                  >
                    <Icon type={iconType} style={iconStyle}></Icon>
                    <p>{iconType}</p>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
