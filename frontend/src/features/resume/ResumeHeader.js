import { useState, useEffect } from "react";
import { saveChunk, getUserName, getSharable, setSharable } from "./api";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Space, Button, Avatar, Modal, Select } from "antd";
import { SaveOutlined, HomeTwoTone, SmileFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import { VIEW_MODE, EDIT_MODE } from "./config";
import { logout } from "../homePage/api";
import { selectChunkIdList, selectChangeRecord, clearChangeRecord } from "./resumeSlice";

const { Header } = Layout;
const { Option } = Select;

export default function ResumeBody({ mode, setMode }) {
  const dispatch = useDispatch();

  const changeRecord = useSelector(selectChangeRecord);
  const chunkIdList = useSelector(selectChunkIdList);

  const [userName, setUserName] = useState("");
  const [shareModelVisibility, setShareModelVisibility] = useState(false);
  const [sharableOption, setShareOption] = useState(false);
  const [remoteSharable, setRemoteSharable] = useState(false)
  const [sharableUrlSuffix, setSharableUrlSuffix] = useState("");

  useEffect(() => {
    getUserName().then((res) => {
      setUserName(res);
    });
    getSharable().then((res) => {
      setRemoteSharable(res.sharable);
      setShareOption(res.sharable)
      setSharableUrlSuffix(res.url_suffix);
    });
  }, []);

  const modeOppsite = {};
  modeOppsite[EDIT_MODE] = VIEW_MODE;
  modeOppsite[VIEW_MODE] = EDIT_MODE;

  const changeModeText = {};
  changeModeText[EDIT_MODE] = "View";
  changeModeText[VIEW_MODE] = "Edit";

  return (
    <>
      <Header>
        <Row>
          <Col span={8}>
            <Space size="small">
              <Link to="/">
                <Button className=" navbar-button-group home-button" icon={<HomeTwoTone />} />
              </Link>
              <Button
                className="save-button"
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => {
                  saveChunk(chunkIdList, changeRecord).then(() => dispatch(clearChangeRecord()));
                }}
              >
                Save
              </Button>
              <Button type="primary" onClick={() => setMode(modeOppsite[mode])}>
                {changeModeText[mode]}
              </Button>
              <Button type="primary" onClick={() => setShareModelVisibility(true)}>
                Share
              </Button>
            </Space>
          </Col>
          <Col span={12} />
          <Col span={1}>
            <Avatar alt={userName} shape="square">
              <SmileFilled style={{ color: "#001529", fontSize: "20px" }} />
            </Avatar>
          </Col>
          <Col span={1}>
            <div className="user-name-row">
              <p className="user-name">{userName}</p>
            </div>
          </Col>
          <Col span={2}>
            <Button className="logout-button" type="primary" onClick={() => logout()}>
              Logout
            </Button>
          </Col>
        </Row>
      </Header>
      <Modal
        title={
          <Space align="center">
            ShareLink
            <Select
              defaultValue={sharableOption === true ? "sharable" : "unsharable"}
              style={{ width: "10em" }}
              onChange={(value) => {
                setShareOption(value);
              }}
            >
              <Option value={true} label="sharable">
                sharable
              </Option>
              <Option value={false} label="unsharable">
                unsharable
              </Option>
            </Select>
            Current: {remoteSharable === true ? "sharable" : "unsharable"}
          </Space>
        }
        visible={shareModelVisibility}
        onOk={() => {
          setSharable(sharableOption)
            .then((res) => {
              setRemoteSharable(res);
            })
            .catch(err =>
              console.log(err)
            );
          setShareModelVisibility(false);
        }}
        onCancel={() => {
          setShareModelVisibility(false);
        }}
        okText="Set"
        cancelText="Cancel"
      >
        <p>{`http://localhost:3000/viewResume/${sharableUrlSuffix}`}</p>
      </Modal>
    </>
  );
}
