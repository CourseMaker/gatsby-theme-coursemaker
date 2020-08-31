import React, { Component } from "react";
import Lecture from "./lecture";

class Lectures extends Component {
	state = {
		showLectures: true,
	};

	toggle = () => {
		this.setState({
			showLectures: !this.state.showLectures,
		});
	};

	render() {
		const { size, data } = this.props;
		function getArrayLength(array) {
			return array.length;
		}

		return (
			<div className="overflow-hidden border border-indigo-200 rounded-lg curriculum-item">
				<div
					className={
						"bg-indigo-100 py-4 px-6 " +
						(size == "big" ? "flex items-center" : "relative")
					}
				>
					<h3
						className={"font-bold " + (size == "big" ? "text-2xl" : "text-lg")}
					>
						{data.title}
					</h3>
					<p className="ml-auto text-gray-500">
						{size == "big" ? (
							<span>0/{getArrayLength(data.lectures)} Lectures Completed</span>
						) : (
							<span>{getArrayLength(data.lectures)} Lectures</span>
						)}
					</p>

					<div
						className={
							"w-5 h-5 ml-5 cursor-pointer " +
							(size == "big"
								? ""
								: "absolute top-0 right-0 transform translate-y-6 -translate-x-6")
						}
						onClick={this.toggle}
					>
						<svg
							className="transition transform duration-300"
							data-name="Layer 1"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								transform: this.state.showLectures ? "scaleY(-1)" : "",
							}}
						>
							<path
								fill="none"
								stroke="#555"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M20.59 7.66l-8.69 8.68-8.49-8.48"
							/>
						</svg>
					</div>
				</div>
				<div className={this.state.showLectures ? "block" : "hidden"}>
					{data.lectures.map((lecture, j) => {
						return <Lecture data={lecture} size={size} key={`lecture-${j}`} />;
					})}
				</div>
			</div>
		);
	}
}

export default Lectures;
