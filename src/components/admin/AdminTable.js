import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"

import Div from "../basic/Div"
import Img from "../basic/Img"
import P from "../basic/P"
import { MdButton } from "../basic/Button"

import {
  categoryRequestState,
  categoryUpdateState,
  reportChannelState,
  reportPostState,
  reportCommentState,
  reportReplyCommentState,
  logState,
  logIdxState,
} from "../../recoil/adminState"
import { categoryMenuState } from "../../recoil/navState"

const TableStyle = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  width: 1000px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const TdStyle = styled.td`
  border: 1px solid #eeeeee;
  background: white;
  padding: 5px;
`

const ThStyle = styled.th`
  border: 1px solid #eeeeee;
  background: #ff6b6b;
  color: white;
  padding: 5px;
`

const ThInfoStyle = styled.th`
  border: 1px solid #eeeeee;
  background: white;
  padding: 5px;
  //column-span: 6;
`

const AdminCategoryRequestTable = () => {
  const [categoryRequest, setCategoryRequest] =
    useRecoilState(categoryRequestState)
  const [categoryUpdate, setCategoryUpdate] =
    useRecoilState(categoryUpdateState)

  useEffect(() => {
    fetch("https://api.슛.site/category", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryUpdate),
    }).then(async (res) => {
      const result = await res.json()
      console.log(result)
      console.log(categoryUpdate)
    })
  }, [categoryUpdate])

  useEffect(() => {
    fetch("https://api.슛.site/request-category/all", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setCategoryRequest(res.data)
        console.log(res.data)
      })
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>번호</ThStyle>
          <ThStyle>카테고리 이름</ThStyle>
          <ThStyle>요청 횟수</ThStyle>
          <ThStyle>최근 요청 날짜</ThStyle>
          <ThStyle>추가</ThStyle>
          <ThStyle>삭제</ThStyle>
        </tr>
        {categoryRequest &&
          categoryRequest.map(
            (
              { request_category_name, request_count, recent_request_time },
              index
            ) => (
              <tr key={request_category_name}>
                <TdStyle>{index + 1}</TdStyle>
                <TdStyle>{request_category_name}</TdStyle>
                <TdStyle>{request_count}</TdStyle>
                <TdStyle>{recent_request_time}</TdStyle>
                <TdStyle>
                  <Div
                    display="flex"
                    width="100%"
                    onClick={() => {
                      setCategoryUpdate({ category: request_category_name })
                    }}
                  >
                    <Div width="20px" height="20px" pointer>
                      <Img src="/assets/images/add.svg" />
                    </Div>
                  </Div>
                </TdStyle>
                <TdStyle>
                  <Div
                    display="flex"
                    width="100%"
                    onClick={() => {
                      fetch(
                        `https://api.슛.site/request-category/${request_category_name}`,
                        {
                          method: "DELETE",
                          credentials: "include",
                        }
                      )
                        .then((res) => res.json())
                        .then((res) => {
                          const filteredData = categoryRequest.filter(
                            (element) =>
                              !request_category_name.includes(
                                element.request_category_name
                              )
                          )
                          console.log(filteredData)
                          setCategoryRequest(filteredData)
                        })
                    }}
                  >
                    <Div width="20px" height="20px" pointer>
                      <Img src="/assets/images/delete.svg" />
                    </Div>
                  </Div>
                </TdStyle>
              </tr>
            )
          )}
      </tbody>
    </TableStyle>
  )
}

const AdminCategoryUpdateTable = () => {
  const [categoryMenu, setCategoryMenu] = useRecoilState(categoryMenuState)

  useEffect(() => {
    fetch("https://api.슛.site/category/all", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setCategoryMenu(res.data)
      })
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>번호</ThStyle>
          <ThStyle>카테고리 이름</ThStyle>
          <ThStyle>추가 날짜</ThStyle>
          <ThStyle>삭제</ThStyle>
        </tr>
        {categoryMenu &&
          categoryMenu.map(({ category_idx, category_name, category_time }) => (
            <tr key={category_idx}>
              <TdStyle>{category_idx}</TdStyle>
              <TdStyle>{category_name}</TdStyle>
              <TdStyle>{category_time}</TdStyle>
              <TdStyle>
                <MdButton
                  backgroundColor="red"
                  onClick={() => {
                    fetch(`https://api.슛.site/category/${category_idx}`, {
                      method: "DELETE",
                      credentials: "include",
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        const filteredData = categoryMenu.filter(
                          (element) =>
                            !category_idx.includes(element.category_idx)
                        )
                        console.log(filteredData)
                        setCategoryMenu(filteredData)
                      })
                  }}
                >
                  <P color="white" fontSize="sm">
                    삭제하기
                  </P>
                </MdButton>
              </TdStyle>
            </tr>
          ))}
      </tbody>
    </TableStyle>
  )
}

const AdminReportPostTable = () => {
  const [reportPost, setReportPost] = useRecoilState(reportPostState)

  useEffect(() => {
    let tmpReportPost = [
      {
        reported_post_idx: 4,
        reported_post_title: "hello",
        reported_post_upload_time: "2022-11-12",
        reported_channel_email: "shoot.naver.com",
        reported_channel_name: "qwerr",
        report_count: 2,
      },
    ]

    setReportPost(tmpReportPost)
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>번호</ThStyle>
          <ThStyle>게시글 제목</ThStyle>
          <ThStyle>업로드 날짜</ThStyle>
          <ThStyle>이메일</ThStyle>
          <ThStyle>채널 이름</ThStyle>
          <ThStyle>신고 횟수</ThStyle>
          <ThStyle>삭제</ThStyle>
        </tr>
        {reportPost.map(
          ({
            reported_post_idx,
            reported_post_title,
            reported_post_upload_time,
            reported_channel_email,
            reported_channel_name,
            report_count,
          }) => (
            <tr key={reported_post_idx}>
              <TdStyle>{reported_post_idx}</TdStyle>
              <TdStyle>{reported_post_title}</TdStyle>
              <TdStyle>{reported_post_upload_time}</TdStyle>
              <TdStyle>{reported_channel_email}</TdStyle>
              <TdStyle>{reported_channel_name}</TdStyle>
              <TdStyle>{report_count}</TdStyle>
              <TdStyle>
                <Div display="flex" width="100%">
                  <Div width="20px" height="20px" pointer>
                    <Img src="/assets/images/delete.svg" />
                  </Div>
                </Div>
              </TdStyle>
            </tr>
          )
        )}
      </tbody>
    </TableStyle>
  )
}

const AdminReportChannelTable = () => {
  const [reportChannel, setReportChannel] = useRecoilState(reportChannelState)

  useEffect(() => {
    let tmpReportChannel = [
      {
        reported_channel_email: "shoot.naver.com",
        reported_channel_time: "2022-12-23",
        reported_channel_name: "qwerr",
        report_count: 5,
      },
      {
        reported_channel_email: "stageus.naver.com",
        reported_channel_time: "2022-12-28",
        reported_channel_name: "poiu12",
        report_count: 10,
      },
    ]

    setReportChannel(tmpReportChannel)
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>번호</ThStyle>
          <ThStyle>이메일</ThStyle>
          <ThStyle>신고 날짜</ThStyle>
          <ThStyle>채널 이름</ThStyle>
          <ThStyle>신고 횟수</ThStyle>
          <ThStyle>삭제</ThStyle>
        </tr>
        {reportChannel.map(
          (
            {
              reported_channel_email,
              reported_channel_time,
              reported_channel_name,
              report_count,
            },
            index
          ) => (
            <tr key={reported_channel_time}>
              <TdStyle>{index + 1}</TdStyle>
              <TdStyle>{reported_channel_email}</TdStyle>
              <TdStyle>{reported_channel_time}</TdStyle>
              <TdStyle>{reported_channel_name}</TdStyle>
              <TdStyle>{report_count}</TdStyle>
              <TdStyle>
                <Div display="flex" width="100%">
                  <Div width="20px" height="20px" pointer>
                    <Img src="/assets/images/delete.svg" />
                  </Div>
                </Div>
              </TdStyle>
            </tr>
          )
        )}
      </tbody>
    </TableStyle>
  )
}

const AdminReportCommentTable = () => {
  const [reportComment, setReportComment] = useRecoilState(reportCommentState)

  useEffect(() => {
    let tmpReportComment = [
      {
        post_idx: 33,
        reported_comment_idx: 2,
        reported_comment_contents: "helloheool",
        reported_comment_write_time: "2023-01-12",
        reported_channel_email: "shoot.naver.com",
        reported_channel_name: "qwerr",
        report_count: 5,
      },
    ]

    setReportComment(tmpReportComment)
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>번호</ThStyle>
          <ThStyle>작성 날짜</ThStyle>
          <ThStyle>이메일</ThStyle>
          <ThStyle>신고 횟수</ThStyle>
          <ThStyle>삭제</ThStyle>
        </tr>
        {reportComment.map(
          ({
            post_idx,
            reported_comment_idx,
            reported_comment_write_time,
            reported_channel_email,
            reported_channel_name,
            report_count,
          }) => (
            <tr key={reported_comment_idx}>
              <TdStyle>{post_idx}</TdStyle>
              <TdStyle>{reported_comment_write_time}</TdStyle>
              <TdStyle>{reported_channel_email}</TdStyle>
              <TdStyle>{report_count}</TdStyle>
              <TdStyle>
                <Div display="flex" width="100%">
                  <Div width="20px" height="20px" pointer>
                    <Img src="/assets/images/delete.svg" />
                  </Div>
                </Div>
              </TdStyle>
            </tr>
          )
        )}
      </tbody>
    </TableStyle>
  )
}

const AdminReportReplyCommentTable = () => {
  const [reportReplyComment, setReportReplyComment] = useRecoilState(
    reportReplyCommentState
  )

  useEffect(() => {
    let tmpReportReplyComment = [
      {
        post_idx: 23,
        reported_reply_comment_idx: 2,
        reported_reply_comment_contents: "helloheool",
        reported_reply_comment_write_time: "2023-01-12",
        reported_channel_email: "shoot.naver.com",
        reported_channel_name: "qwerr",
        report_count: 5,
      },
    ]

    setReportReplyComment(tmpReportReplyComment)
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>번호</ThStyle>
          <ThStyle>작성 날짜</ThStyle>
          <ThStyle>이메일</ThStyle>
          <ThStyle>신고 횟수</ThStyle>
          <ThStyle>삭제</ThStyle>
        </tr>
        {reportReplyComment.map(
          ({
            post_idx,
            reported_reply_comment_idx,
            reported_reply_comment_contents,
            reported_reply_comment_write_time,
            reported_channel_email,
            reported_channel_name,
            report_count,
          }) => (
            <tr key={reported_reply_comment_idx}>
              <TdStyle>{post_idx}</TdStyle>
              <TdStyle>{reported_reply_comment_write_time}</TdStyle>
              <TdStyle>{reported_channel_email}</TdStyle>
              <TdStyle>{report_count}</TdStyle>
              <TdStyle>
                <Div display="flex" width="100%">
                  <Div width="20px" height="20px" pointer>
                    <Img src="/assets/images/delete.svg" />
                  </Div>
                </Div>
              </TdStyle>
            </tr>
          )
        )}
      </tbody>
    </TableStyle>
  )
}

const AdminLogTable = () => {
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState(0)
  const [log, setLog] = useRecoilState(logState)
  const [logIdx, setLogIdx] = useRecoilState(logIdxState)

  useEffect(() => {
    /* let tmpLog = [
      {
        id: "1",
        ip: "123.123.123",
        req_channel_email: "shoot.naver.com",
        method: "abc",
        api_path: "path",
        req_time: "timestamp",
        res_time: "timestamp",
        status_code: 1,
        result: "string",
      },
    ]*/

    fetch("https://api.슛.site/log/all", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setLog(res.data)
        console.log(res)
      })
  }, [])

  return (
    <TableStyle>
      <tbody>
        <tr>
          <ThStyle>이메일</ThStyle>
          <ThStyle>IP</ThStyle>
          <ThStyle>URL</ThStyle>
          <ThStyle>시간</ThStyle>
          <ThStyle>응답</ThStyle>
          <ThStyle></ThStyle>
        </tr>
        {log &&
          log.map(
            (
              {
                id,
                ip,
                req_channel_email,
                method,
                api_path,
                req_time,
                res_time,
                status_code,
                result,
              },
              index
            ) => (
              <React.Fragment key={req_time}>
                <tr>
                  <TdStyle>{req_channel_email}</TdStyle>
                  <TdStyle>{ip}</TdStyle>
                  <TdStyle>{api_path}</TdStyle>
                  <TdStyle>{req_time}</TdStyle>
                  <TdStyle>{status_code}</TdStyle>
                  <TdStyle>
                    <Div display="flex" width="100%">
                      <Div
                        width="20px"
                        height="20px"
                        pointer
                        onClick={() => {
                          fetch(`https://api.슛.site/log/${id}`, {
                            method: "GET",
                            credentials: "include",
                          })
                            .then((res) => res.json())
                            .then((res) => {
                              setLogIdx(res.data)
                              console.log(res)
                            })
                          setSelect(id)
                          setOpen(true)
                        }}
                      >
                        <Img src="../assets/images/downArrow.svg" />
                      </Div>
                    </Div>
                  </TdStyle>
                </tr>
                {id === select && open && logIdx && (
                  <tr>
                    <ThInfoStyle colSpan="6">
                      <P>이메일:{logIdx.req_channel_email}</P>
                      <P>IP: {logIdx.ip}</P>
                      <P>URL: {logIdx.api_path}</P>
                      <P>시간: {logIdx.res_time}</P>
                      <P>상태코드: {logIdx.status_code}</P>
                      <P>Result: {logIdx.result}</P>
                      <MdButton backgroundColor="red" margin="5px">
                        <P color="white" fontSize="sm" fontWeight="700">
                          정지하기
                        </P>
                      </MdButton>
                      <MdButton
                        backgroundColor="gray"
                        margin="5px"
                        onClick={() => {
                          setOpen(false)
                          setSelect(0)
                        }}
                      >
                        <P color="white" fontSize="sm" fontWeight="700">
                          닫기
                        </P>
                      </MdButton>
                    </ThInfoStyle>
                  </tr>
                )}
              </React.Fragment>
            )
          )}
      </tbody>
    </TableStyle>
  )
}

export {
  AdminCategoryRequestTable,
  AdminCategoryUpdateTable,
  AdminReportPostTable,
  AdminReportChannelTable,
  AdminReportCommentTable,
  AdminReportReplyCommentTable,
  AdminLogTable,
}
