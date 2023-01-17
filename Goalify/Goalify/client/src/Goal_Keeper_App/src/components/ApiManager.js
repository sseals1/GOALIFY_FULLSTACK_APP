import React from "react";

const baseUrl = "/api/users";

export const UserByEmail = (email) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
};

export const getUsers = () => {
  return fetch(baseUrl).then((res) => res.json());
};
export const ListOfGoals = () => {
  return fetch(
    `http://localhost:8088/goals?_expand=category&_expand=priority&_expand=term`
  ).then((res) => res.json());
};
export const GetAllGoals = () => {
  return fetch(`http://localhost:8088/goals`).then((res) => res.json());
};
export const GoalCategory = () => {
  return fetch(`http://localhost:8088/categories`).then((res) => res.json());
};

export const GoalPriority = () => {
  return fetch(`http://localhost:8088/priorities`).then((res) => res.json());
};

export const TimeFrame = () => {
  return fetch(`/api/terms`).then((res) => res.json());
};

export const GoalTips = () => {
  return fetch(`http://localhost:8088/tips`).then((res) => res.json());
};

export const Review = () => {
  return fetch(`http://localhost:8088/reviews`).then((res) => res.json());
};

export const GetGoal = (goalsId) => {
  return fetch(`http://localhost:8088/goals/${goalsId}`).then((res) =>
    res.json()
  );
};

export const getTips = (tipsId) => {
  return fetch(`http://localhost:8088/tips/${tipsId}`).then((res) =>
    res.json()
  );
};

export const getCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((res) => res.json());
};

export const getMilestones = () => {
  return fetch(`http://localhost:8088/milestones?_expand=goal`).then((res) =>
    res.json()
  );
};
export const getFilledMilestones = (goalsId) => {
  return fetch(`http://localhost:8088/milestones/${goalsId}`).then((res) =>
    res.json()
  );
};
