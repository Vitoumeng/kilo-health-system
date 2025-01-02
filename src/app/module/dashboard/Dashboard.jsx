import React, { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdOutlineTopic } from "react-icons/md";
import useUser from "../user/User/core/action";
import useCategory from "../category/core/action";
import usePost from "../post/core/action";
import useTopic from "../topic/core/action";

const Dashboard = () => {
  const { fetchUsers, users } = useUser();
  const { fetchCategory, category } = useCategory();
  const { fetchPost, post } = usePost();
  const { fetchTopic, topic } = useTopic();

  useEffect(() => {
    fetchUsers(10000, 1);
    fetchCategory(10000, 1);
    fetchPost(10000, 1);
    fetchTopic(10000, 1);
  }, []);

  const cards = [
    { color: "#9b59b6", icon: <LuUser />, label: "User" },
    { color: "#e74c3c", icon: <FaListUl />, label: "Category" },
    { color: "#3498db", icon: <BsPostcard />, label: "Post" },
    { color: "#27ae60", icon: <MdOutlineTopic />, label: "Topic" },
  ];

  const numberCount = [
    users.length,
    category.length,
    post.length,
    topic.length,
  ];
  const [count, setCount] = useState(Array(numberCount.length).fill(0));

  useEffect(() => {
    const duration = 2000; 
    const intervalTime = 50; 
    const steps = duration / intervalTime;

    const increments = numberCount.map((num) => Math.ceil(num / steps));

    const interval = setInterval(() => {
      setCount((prevCounts) =>
        prevCounts.map((prev, i) =>
          prev < numberCount[i]
            ? Math.min(prev + increments[i], numberCount[i])
            : prev
        )
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, [numberCount]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card text-light rounded-3 border-0 d-flex flex-column align-items-start justify-content-center"
            style={{
              width: "280px",
              height: "140px",
              backgroundColor: card.color,
              padding: "20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "2rem", color: "#fff" }}>{card.icon}</div>
            <p
              className="fw-semibold"
              style={{ fontSize: "24px", margin: "10px 0 0", color: "#f0f0f0" }}
            >
              {count[index]}
            </p>
            <p
              className="mb-0 fw-medium"
              style={{ fontSize: "16px", color: "#f0f0f0" }}
            >
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
