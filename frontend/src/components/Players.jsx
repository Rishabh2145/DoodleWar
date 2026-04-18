import React from "react";

export default function Player(props) {
    return (
        <div
            key={props.i}
            className="h-24 rounded-xl flex items-center justify-center 
          bg-white/10 border border-white/10"
        >
            {props.players[props.i] ? (
                <span className="text-white font-semibold">{props.players[props.i]}</span>
            ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
            )}
        </div>
    );
}
