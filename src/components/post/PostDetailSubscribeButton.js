import React, { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"

import P from "../basic/P"
import { MdButton } from "../basic/Button"
import { isSubscribeState, postInfoState } from "../../recoil/postState"

const PostDetailSubscribeButton = () => {
  const postInfo = useRecoilValue(postInfoState)
  const { upload_channel_email, subscribe_state } = postInfo
  const [isSubscribe, setIsSubscribe] = useRecoilState(isSubscribeState)

  // 임시 데이터
  const isLogin = true

  const setSubscribe = () => {
    if (isLogin === false) {
      alert(
        "로그인 후 이용 가능합니다. 로그인 하시겠습니까? 알람 띄우기 기능 구현"
      )
    } else {
      alert(`${upload_channel_email} 구독 api`)
      setIsSubscribe(true)
    }
  }

  const removeSubscribe = () => {
    alert(`${upload_channel_email} 구독 취소 api`)
    setIsSubscribe(false)
  }

  useEffect(() => {
    setIsSubscribe(subscribe_state || false)
  }, [postInfo])

  return (
    <React.Fragment>
      {(isSubscribe === false && (
        <MdButton onClick={setSubscribe} backgroundColor="primary">
          <P color="white">구독</P>
        </MdButton>
      )) ||
        (isSubscribe === true && (
          <MdButton
            onClick={removeSubscribe}
            border="2px solid #FF6B6B"
            backgroundColor="white"
          >
            <P color="primary">구독중</P>
          </MdButton>
        ))}
    </React.Fragment>
  )
}

export default PostDetailSubscribeButton
