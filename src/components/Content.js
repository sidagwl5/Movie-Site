import { css } from "@twind/core";
import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { tw } from "twind";

const Content = () => {
  return (
    <div
      className={tw(
        css({
          position: "relative",
          width: "100%",
          padding: "20px",
          color: "white",
          fontSize: "18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.5rem",
          alignItems: "flex-start",
          backgroundImage: `linear-gradient(
          12deg,
          rgba(193, 193, 193, 0.05) 0%,
          rgba(193, 193, 193, 0.05) 2%,
          rgba(129, 129, 129, 0.05) 2%,
          rgba(129, 129, 129, 0.05) 27%,
          rgba(185, 185, 185, 0.05) 27%,
          rgba(185, 185, 185, 0.05) 66%,
          rgba(83, 83, 83, 0.05) 66%,
          rgba(83, 83, 83, 0.05) 100%
        ),
        linear-gradient(
          321deg,
          rgba(240, 240, 240, 0.05) 0%,
          rgba(240, 240, 240, 0.05) 13%,
          rgba(231, 231, 231, 0.05) 13%,
          rgba(231, 231, 231, 0.05) 34%,
          rgba(139, 139, 139, 0.05) 34%,
          rgba(139, 139, 139, 0.05) 71%,
          rgba(112, 112, 112, 0.05) 71%,
          rgba(112, 112, 112, 0.05) 100%
        ),
        linear-gradient(
          236deg,
          rgba(189, 189, 189, 0.05) 0%,
          rgba(189, 189, 189, 0.05) 47%,
          rgba(138, 138, 138, 0.05) 47%,
          rgba(138, 138, 138, 0.05) 58%,
          rgba(108, 108, 108, 0.05) 58%,
          rgba(108, 108, 108, 0.05) 85%,
          rgba(143, 143, 143, 0.05) 85%,
          rgba(143, 143, 143, 0.05) 100%
        ),
        linear-gradient(
          96deg,
          rgba(53, 53, 53, 0.05) 0%,
          rgba(53, 53, 53, 0.05) 53%,
          rgba(44, 44, 44, 0.05) 53%,
          rgba(44, 44, 44, 0.05) 82%,
          rgba(77, 77, 77, 0.05) 82%,
          rgba(77, 77, 77, 0.05) 98%,
          rgba(8, 8, 8, 0.05) 98%,
          rgba(8, 8, 8, 0.05) 100%
        ),
        linear-gradient(334deg, hsl(247, 0%, 2%), hsl(247, 0%, 2%))`,
        })
      )}
    >
      <p className={tw("opacity-80 font-light")}>
        Film, also called movie or motion picture, is a medium used to simulate
        experiences that communicate ideas, stories, perceptions, feelings,
        beauty or atmosphere by the means of recorded or programmed moving
        images along with other sensory stimulations.The word "cinema", short
        for cinematography, is often used to refer to filmmaking and the film
        industry, and to the art form that is the result of it.
      </p>

      <p className={tw("opacity-80 font-light")}>
        The moving images of a film are created by photographing actual scenes
        with a motion-picture camera, by photographing drawings or miniature
        models using traditional animation techniques, by means of CGI and
        computer animation, or by a combination of some or all of these
        techniques, and other visual effects. Traditionally, films were recorded
        onto celluloid film through a photochemical process and then shown
        through a movie projector onto a large screen.
      </p>

      <br />

      <Link to="/moviepage">
        <button
          className={tw(
            css({
              padding: "10px",
              border: "0.5px orange solid",
              fontSize: "17px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "white",
              backgroundColor: "transparent",
            })
          )}
        >
          MoviePage
        </button>
      </Link>
    </div>
  );
};

export default observer(Content);
