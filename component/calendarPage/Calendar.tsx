"use client";
import styles from "./Calendar.module.scss";
import { useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import { ShowEvent } from "./ShowEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IdolInform from "./IdolInform";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { specificIdolSchedule } from "@/utils/axios/AxiosSetting";
import { CalendarPageProps } from "@/app/calendar/[idolID]/page";
import {
  faChevronLeft,
  faChevronRight,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import CategoryBtn from "./CategoryBtn";
const ViewDayCalendarModal = dynamic(
  () => import("@/UI/Modal/ViewDayCalendarModal")
);
const ReportBtn = dynamic(() => import("@/UI/Button/ReportBtn"));

interface CalendarProps extends CalendarPageProps {
  idolData: any;
}

const days = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({ idolData, params }: CalendarProps) => {
  const idolId = params.idolID;
  const { data: newIdolSchedule = [], isLoading } = useQuery(
    ["idolSchedule", idolId],
    () => specificIdolSchedule(idolId)
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  /**선택한 날 */
  const [selectedDay, setSelectedDay] = useState(moment());

  /**현재 보여주는 달의 날짜들 */
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;

  // 그 달의 시작하는 week() 주
  const firstWeek = today.clone().startOf("month").week();

  //  1년은 52주가 존재하고 며칠이 더 있는데 이 부분을 달력은 53주로써 표현해야 함
  // 하지만 moment()는 내년의 첫 주인 1로 표시하기 때문에 마지막 주가 1이라면 53으로 표시
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const calendarArr = () => {
    let result: any[] = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <Tr
          key={week}
          fontSize={[15, 18, 20]}
          lineHeight={2}
          padding={[2, 3, 4]}
        >
          {Array(7)
            .fill(0)
            // eslint-disable-next-line
            .map((data: any, index: number) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              // 오늘 날짜에 today style 적용
              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <Td
                    width={10}
                    height={20}
                    padding={[2, 3, 4]}
                    textAlign="center"
                    key={index}
                    onClick={() => {
                      setSelectedDay(days);
                      onOpen();
                    }}
                    cursor={"pointer"}
                  >
                    <div
                      className={
                        selectedDay &&
                        selectedDay.format("YYYYMMDD") ===
                          days.format("YYYYMMDD")
                          ? styles.selectedDay
                          : undefined
                      }
                    >
                      {days.format("D")}
                    </div>

                    <div className={styles.eventContent}>
                      <ShowEvent
                        days={days}
                        newIdolSchedule={newIdolSchedule}
                      />
                    </div>
                  </Td>
                );
                // 다른 달은 글씨 색 연하게
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <Td
                    width={10}
                    height={20}
                    padding={[2, 3, 4]}
                    textAlign="center"
                    key={index}
                    style={{ color: "#c2c2c2" }}
                  >
                    {days.format("D")}
                    <div className={styles.eventContent} />
                  </Td>
                );
              } else {
                return (
                  <Td
                    width={10}
                    height={20}
                    padding={[2, 3, 4]}
                    textAlign="center"
                    key={index}
                    onClick={(e) => {
                      setSelectedDay(days);
                      onOpen();
                    }}
                    cursor={"pointer"}
                  >
                    <div
                      className={
                        selectedDay &&
                        selectedDay.format("YYYYMMDD") ===
                          days.format("YYYYMMDD")
                          ? styles.selectedDay
                          : undefined
                      }
                    >
                      {days.format("D")}
                    </div>
                    <div className={styles.eventContent}>
                      <ShowEvent
                        days={days}
                        newIdolSchedule={newIdolSchedule}
                      />
                    </div>
                  </Td>
                );
              }
            })}
        </Tr>
      );
    }
    return result;
  };

  return (
    <>
      <ViewDayCalendarModal
        selectedDay={selectedDay}
        isOpen={isOpen}
        onClose={onClose}
      />
      <div className={styles.calendarContainer}>
        <Flex justifyContent="space-between" padding="10px 20px">
          <IdolInform idolData={idolData} />
          <Flex fontSize={[20, 25, 30]} margin={"auto 0"}>
            <Button
              onClick={() => {
                setMoment(getMoment.clone().subtract(1, "month"));
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </Button>
            <Text
              margin="auto 5px"
              width={["75px", "130px", "150px"]}
              textAlign={"center"}
            >
              {today.format("YYYY.MM")}
            </Text>
            <Button
              onClick={() => {
                setMoment(getMoment.clone().add(1, "month"));
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </Button>
            <Button
              onClick={() => {
                setMoment(moment());
              }}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </Button>
          </Flex>
        </Flex>
        <CategoryBtn idolId={idolId} />
        {!isLoading ? (
          <Table h={"500px"} w="100%">
            <Thead>
              <Tr>
                {days.map((day, index) => {
                  return (
                    <Th
                      key={index}
                      textAlign="center"
                      fontSize={[15, 18, 20]}
                      padding={[3, 4, 5]}
                    >
                      {day}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody className={styles.calendarTbody}>{calendarArr()}</Tbody>
          </Table>
        ) : (
          <Box w="100%" h={"500px"}>
            <Spinner
              position="absolute"
              top="45%"
              left="47.5%"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#f89598"
              size="xl"
            />
          </Box>
        )}
        <ReportBtn />
      </div>
    </>
  );
};
export default Calendar;
