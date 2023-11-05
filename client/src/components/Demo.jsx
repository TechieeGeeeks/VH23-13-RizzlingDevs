import React from "react";
import PropTypes from "prop-types";

function Demo({ title, name, date, hash, logo }) {
  return (
    <div>
      {/* desk */}
      <div className=" hidden md:hidden lg:flex">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="700"
            id="certificate"
          >
            <defs>
              <filter id="drop-shadow">
                <feFlood flood-color="rgba(109, 40, 217, 1)" result="color" />
                <feOffset in="SourceAlpha" dx="5" dy="5" result="offset" />
                <feComposite
                  in="color"
                  in2="offset"
                  operator="in"
                  result="shadow"
                />
                <feComposite in="SourceGraphic" in2="shadow" operator="over" />
              </filter>
            </defs>
            <rect
              x="50"
              y="25"
              rx="20"
              ry="20"
              width="900"
              height="600"
              id="border"
              fill="white"
              stroke="rgba(109, 40, 217, 1)"
              filter="url(#drop-shadow)"
            />
            <text
              x="500"
              y="100"
              text-anchor="middle"
              fill="purple"
              id="bodyTitle"
              font-size="36"
            >
              Certificate Of Appreciating for
            </text>
            <text
              x="500"
              y="150"
              text-anchor="middle"
              fill="purple"
              id="bodyTitle"
              font-size="36"
            >
              Completing Course On:
            </text>
            <line x1="250" y1="260" x2="750" y2="260" id="titleUnderLine" />
            <text
              x="500"
              y="250"
              text-anchor="middle"
              fill="black"
              id="title"
              fontWeight={"bold"}
              fontSize={26}
            >
              {title}
            </text>
            <text
              x="500"
              y="300"
              text-anchor="middle"
              fill="black"
              id="subTitleHeader"
              fontSize={20}
            >
              awarded to
            </text>
            <text
              x="500"
              y="340"
              text-anchor="middle"
              fill="black"
              id="name"
              fontSize={22}
              fontWeight={"bold"}
            >
              {name}
            </text>
            <line x1="200" y1="410" x2="800" y2="410" id="titleUnderLine" />
            <text
              x="500"
              y="370"
              text-anchor="middle"
              fill="black"
              id="bodySubTitle"
            >
              on
            </text>
            <text x="500" y="410" text-anchor="middle" fill="black" id="date">
              {date}
            </text>
            <line x1="400" y1="510" x2="600" y2="510" id="titleUnderLine" />
            <text x="100" y="575" text-anchor="start" fill="black" id="hash">
              ID: {hash}
            </text>
            <image
              x="650"
              y="300"
              height="200px"
              width="200px"
              id="logo"
              href={logo}
            />
            Sorry, your browser does not support inline SVG.
          </svg>
        </div>
      </div>

      {/* Tab */}
      <div className=" hidden lg:hidden md:flex items-center justify-center">
        <div className="hidden lg:hidden md:flex">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="900"
              height="500"
              id="certificate"
            >
              <defs>
                <filter id="drop-shadow">
                  <feFlood floodColor="rgba(109, 40, 217, 1)" result="color" />
                  <feOffset in="SourceAlpha" dx="5" dy="5" result="offset" />
                  <feComposite
                    in="color"
                    in2="offset"
                    operator="in"
                    result="shadow"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="shadow"
                    operator="over"
                  />
                </filter>
              </defs>
              <rect
                x="10%"
                y="25"
                rx="20"
                ry="20"
                width="80%"
                height="400"
                id="border"
                fill="white"
                stroke="rgba(109, 40, 217, 1)"
                filter="url(#drop-shadow)"
              />
              <text
                x="50%"
                y="100"
                textAnchor="middle"
                fill="purple"
                id="bodyTitle"
                fontSize="24"
              >
                Certificate Of Appreciating for
              </text>
              <text
                x="50%"
                y="150"
                textAnchor="middle"
                fill="purple"
                id="bodyTitle"
                fontSize="24"
              >
                Completing Course On:
              </text>
              <line x1="30%" y1="260" x2="70%" y2="260" id="titleUnderLine" />
              <text
                x="50%"
                y="190"
                textAnchor="middle"
                fill="black"
                id="title"
                fontSize={20}
                fontWeight="bold"
              >
                {title}
              </text>
              <text
                x="50%"
                y="230"
                textAnchor="middle"
                fill="black"
                id="subTitleHeader"
              >
                Awarded to
              </text>
              <text
                x="50%"
                y="260"
                textAnchor="middle"
                fill="black"
                id="name"
                fontWeight="bold"
                fontSize={20}
              >
                {name}
              </text>
              <line x1="20%" y1="410" x2="80%" y2="410" id="titleUnderLine" />
              <text
                x="50%"
                y="300"
                textAnchor="middle"
                fill="black"
                id="bodySubTitle"
              >
                Will be Valid for Next
              </text>
              <text x="50%" y="330" textAnchor="middle" fill="black" id="date">
                {date} Days
              </text>
              <line x1="40%" y1="510" x2="60%" y2="510" id="titleUnderLine" />
              <text x="10%" y="575" textAnchor="start" fill="black" id="hash">
                ID: {hash}
              </text>
              <image
                x="70%"
                y="250"
                height="150px"
                width="150px"
                id="logo"
                href={logo}
              />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className=" flex lg:hidden md:hidden items-center justify-center">
        <div className="flex lg:hidden md:hidden">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="450"
              height="500"
              id="certificate"
            >
              <defs>
                <filter id="drop-shadow">
                  <feFlood flood-color="rgba(109, 40, 217, 1)" result="color" />
                  <feOffset in="SourceAlpha" dx="5" dy="5" result="offset" />
                  <feComposite
                    in="color"
                    in2="offset"
                    operator="in"
                    result="shadow"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="shadow"
                    operator="over"
                  />
                </filter>
              </defs>
              <rect
                x="10%"
                y="25"
                rx="20"
                ry="20"
                width="80%"
                height="400"
                id="border"
                fill="white"
                stroke="rgba(109, 40, 217, 1)"
                filter="url(#drop-shadow)"
              />
              <text
                x="50%"
                y="100"
                textAnchor="middle"
                fill="purple"
                id="bodyTitle"
                fontSize="22"
              >
                Certificate Of Appreciating for
              </text>
              <text
                x="50%"
                y="130"
                textAnchor="middle"
                fill="purple"
                id="bodyTitle"
                fontSize="22"
              >
                Completing Course On:
              </text>
              <line x1="30%" y1="260" x2="70%" y2="260" id="titleUnderLine" />
              <text
                x="50%"
                y="200"
                textAnchor="middle"
                fill="black"
                id="title"
                fontWeight="bold"
              >
                {title}
              </text>
              <text
                x="50%"
                y="250"
                textAnchor="middle"
                fill="black"
                id="subTitleHeader"
              >
                awarded to
              </text>
              <text
                x="50%"
                y="290"
                textAnchor="middle"
                fill="black"
                id="name"
                fontSize={20}
                fontWeight={"bold"}
              >
                {name}
              </text>
              <line x1="20%" y1="410" x2="80%" y2="410" id="titleUnderLine" />
              <text
                x="50%"
                y="320"
                textAnchor="middle"
                fill="black"
                id="bodySubTitle"
              >
                on
              </text>
              <text x="50%" y="360" textAnchor="middle" fill="black" id="date">
                {date}
              </text>
              <line x1="40%" y1="510" x2="60%" y2="510" id="titleUnderLine" />
              <text x="10%" y="575" textAnchor="start" fill="black" id="hash">
                ID: {hash}
              </text>
              <image
                x="65%"
                y="300"
                height="100px"
                width="100px"
                id="logo"
                href={logo}
              />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

Demo.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

export default Demo;
