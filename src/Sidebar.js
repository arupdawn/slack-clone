import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import db from "./firebase";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SiderbarOption from "./SiderbarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";

import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
    // Runs this code ONCE when the sidebar loads
  }, []);

  const showMenu = () => {
    let element;
    element = document.getElementById("Sidebar");
    if (element.style.display == "none") {
      element.style.display = "block";
      //document.getElementById("sideMenu").innerHTML = "Close";
    } else {
      element.style.display = "none";
      //document.getElementById("sideMenu").innerHTML = "Menu";
    }
  };

  const showMenu__button = () => {
    let ele = document.getElementById("main__header");
    console.log("Div display >> ", ele);
    let val = ele.offsetWidth;
    console.log("Width of screen >>>>>", val);

    if (val < 430) {
      let element;
      element = document.getElementById("Sidebar");
      element.style.display = "none";
    }
  };

  return (
    <div id="" className="sidebar__outer">
      <button id="sideMenu" onClick={showMenu}>
        <div className="icon-bar"></div>
        <div className="icon-bar"></div>
        <div className="icon-bar"></div>
      </button>
      <div id="Sidebar" onClick={showMenu__button} className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__info">
            <h2>Coding Geeks</h2>
            <h3>
              <FiberManualRecordIcon />
              {user?.displayName}
            </h3>
          </div>

          <CreateIcon />
        </div>

        <SiderbarOption Icon={InsertCommentIcon} title="Threads" />
        <SiderbarOption Icon={InboxIcon} title="Mentions & Reactions" />
        <SiderbarOption Icon={DraftsIcon} title="Saved Items" />
        <SiderbarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
        <SiderbarOption Icon={PeopleAltIcon} title="People & User Groups" />
        <SiderbarOption Icon={AppsIcon} title="Apps" />
        <SiderbarOption Icon={FileCopyIcon} title="File brwoser" />
        <SiderbarOption Icon={ExpandLessIcon} title="Show less" />
        <hr />
        <SiderbarOption Icon={ExpandMoreIcon} title="Channels" />
        <hr />
        <SiderbarOption Icon={AddIcon} title="Add Channel" addChannelOption />

        {/* Connect to db and list all channels  */}
        {/* <SidebarOption ../> */}
        {channels.map((channel) => (
          <SiderbarOption title={channel.name} id={channel.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
