import React, { forwardRef, useState } from "react";

import styled from "styled-components";

import { Dropdown } from "react-bootstrap";

import { BsChevronRight, BsChevronLeft, BsCaretDownFill } from "react-icons/bs";

const ArrowIcon = styled.div`
  padding: 15px;
  border-radius: 10px;

  display: flex;
  align-items: center;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const YearSelect = styled.div`
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const YearRow = styled.div`
  display: flex;
  margin-bottom: 2px;
  justify-content: center;
`;

const CustomCol = styled.div`
  border-radius: 10px;
  padding: 20px;

  height: 50px;
  width: 50px;
  margin: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.selected ? "#00ADF1" : "#f2f2f2")};
    cursor: pointer;
  }

  color: ${(props) => (props.selected ? "white" : "black")};

  background-color: ${(props) => (props.selected ? "#00ADF1" : "none")};
`;

const CustomRow = styled.div`
  display: flex;
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: #086eb6;
  font-weight: 600;
  font-size: 1rem;
`;

const monthDict = {
  Jan: "Janeiro",
  Fev: "Fevereiro",
  Mar: "Março",
  Abr: "Abril",
  Mai: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Ago: "Agosto",
  Set: "Setembro",
  Out: "Outubro",
  Nov: "Novembro",
  Dez: "Dezembro",
};

function DatePicker() {
  const [year, setYear] = useState(2023);
  const [holdYear, setHoldYear] = useState(2023);
  const [month, setMonth] = useState("Abr");

  const [show, setShow] = useState(false);

  const changeYear = (direction) => {
    if (direction === "right") setHoldYear(holdYear + 1);
    if (direction === "left") setHoldYear(holdYear - 1);
  };

  const DateCol = ({ currentMonth }) => {
    return (
      <CustomCol
        selected={month === currentMonth}
        onClick={() => {
          setMonth(currentMonth);
          setYear(holdYear);
          setShow(false);
        }}
      >
        {currentMonth}
      </CustomCol>
    );
  };

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <CustomLink
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {monthDict[month]}, {year} <BsCaretDownFill />
    </CustomLink>
  ));

  const CustomMenu = forwardRef(({ style, className }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          padding: "10px",
        }}
      >
        <YearRow>
          <ArrowIcon onClick={() => changeYear("left")}>
            <BsChevronLeft size={12} className="m-0 p-0" />
          </ArrowIcon>
          <YearSelect className="text-muted">
            <b>{holdYear}</b>
          </YearSelect>
          <ArrowIcon onClick={() => changeYear("right")}>
            <BsChevronRight size={12} className="m-0 p-0" />
          </ArrowIcon>
        </YearRow>
        <div>
          <CustomRow>
            <DateCol currentMonth={"Jan"} className="text-muted" />
            <DateCol currentMonth={"Fev"} />
            <DateCol currentMonth={"Mar"} />
            <DateCol currentMonth={"Abr"} />
          </CustomRow>
          <CustomRow>
            <DateCol currentMonth={"Mai"} />
            <DateCol currentMonth={"Jun"} />
            <DateCol currentMonth={"Jul"} />
            <DateCol currentMonth={"Ago"} />
          </CustomRow>
          <CustomRow>
            <DateCol currentMonth={"Set"} />
            <DateCol currentMonth={"Out"} />
            <DateCol currentMonth={"Nov"} />
            <DateCol currentMonth={"Dez"} />
          </CustomRow>
        </div>
      </div>
    );
  });

  CustomToggle.displayName = "CustomTogle";
  CustomMenu.displayName = "CustomMenu";

  return (
    <>
      <Dropdown drop="up" onToggle={(state) => setShow(state)} show={show}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

        <Dropdown.Menu as={CustomMenu} />
      </Dropdown>
    </>
  );
}

export default DatePicker;
