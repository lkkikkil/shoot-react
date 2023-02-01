import React from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"

import Div from "../basic/Div"
import Img from "../basic/Img"
import P from "../basic/P"
import { MdButton } from "../basic/Button"
import { IconText } from "../common/IconText"
import HeaderAlarm from "./HeaderAlarm"
import {
  profilePopupOpenState,
  isLoginState,
  userInfoState,
} from "../../recoil/headerState"

const HeaderFunctionComponent = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const [profilePopupOpen, setProfilePopupOpen] = useRecoilState(
    profilePopupOpenState
  )
  const userInfo = useRecoilValue(userInfoState)
  const profilePopupRef = useRef()
  const navigate = useNavigate()

  const { email, name, profile_img } = userInfo

  const moveUploadEvent = () => {
    if (isLogin === true) {
      alert("업로드 페이지로 이동 기능 구현")
    } else {
      alert(
        "로그인 후 이용 가능합니다. 로그인 하시겠습니까? 알람 띄우기 기능 구현"
      )
    }
  }

  const moveLoginEvent = () => {
    alert("로그인 페이지로 이동 기능 구현")
    setIsLogin(true)
  }

  const clickOutProfilePopupEvent = (e) => {
    if (
      profilePopupRef.current &&
      !profilePopupRef.current.contains(e.target)
    ) {
      setProfilePopupOpen(false)
      document.removeEventListener("mousedown", clickOutProfilePopupEvent)
    }
  }

  const openProfilePopupEvent = () => {
    setProfilePopupOpen(!profilePopupOpen)
    document.addEventListener("mousedown", clickOutProfilePopupEvent)
  }

  const moveMyChannelEvent = () => {
    alert(`이메일이 ${email}인 채널페이지로 이동`)
  }

  const logoutLogic = () => {
    alert("로그아웃 기능 구현")
    setIsLogin(false)
  }

  return (
    <Div display="flex">
      <MdButton
        onClick={moveUploadEvent}
        margin="0 15px 0 0"
        border="2px solid #FF6B6B"
        backgroundColor="white"
      >
        <Div display="flex" width="100%" height="100%" borderRadius="5px">
          <Div width="12px" height="12px" margin="0 12px 0 0">
            <Img src="/assets/images/uploadPlus.svg" />
          </Div>
          <Div>
            <P color="primary" fontSize="sm" fontWeight={700}>
              업로드
            </P>
          </Div>
        </Div>
      </MdButton>
      {(isLogin === true && (
        <React.Fragment>
          <HeaderAlarm />
          <Div ref={profilePopupRef} position="relative" margin="0 27px 0 0">
            <IconText
              onClick={openProfilePopupEvent}
              src={profile_img}
              text={name}
              width="40px"
            />
            <Div
              display={profilePopupOpen === true ? "flex" : "none"}
              direction="column"
              position="absolute"
              bottom="0"
              right="0"
              transform="translate( 0, 80% )"
              padding="10px"
              borderRadius="5px"
              backgroundColor="white"
              shadow="0 4px 4px 0 rgba(0,0,0,0.35)"
            >
              <IconText
                onClick={moveMyChannelEvent}
                src="/assets/images/edit.svg"
                text="내 채널"
              />
              <IconText
                onClick={logoutLogic}
                src="/assets/images/report.svg"
                text="로그아웃"
              />
            </Div>
          </Div>
        </React.Fragment>
      )) ||
        (isLogin === false && (
          <MdButton
            onClick={moveLoginEvent}
            backgroundColor="primary"
            margin="0 14px 0 0"
          >
            <P fontSize="sm" fontWeight={700} color="white">
              로그인
            </P>
          </MdButton>
        ))}
    </Div>
  )
}

export default HeaderFunctionComponent