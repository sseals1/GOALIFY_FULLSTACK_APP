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
    `/api/goals?_expand=category&_expand=priority&_expand=term`
  ).then((res) => res.json());
};

export const GetAllGoals = () => {
  return fetch(`/api/goals`).then((res) => res.json());
};

export const GoalCategory = () => {
  return fetch(`/api/categories`).then((res) => res.json());
};

export const GoalPriority = () => {
  return fetch(`/api/priorities`).then((res) => res.json());
};

export const TimeFrame = () => {
  return fetch(`/api/terms`).then((res) => res.json());
};

export const GoalTips = () => {
  return fetch(`/api/tips`).then((res) => res.json());
};

export const Review = () => {
  return fetch(`/api/reviews`).then((res) => res.json());
};

export const GetGoal = (id) => {
  return fetch(`/api/goals/${id}`).then((res) => res.json());
};

export const getTips = (tipsId) => {
  return fetch(`/api/tips/${tipsId}`).then((res) => res.json());
};

export const getCategories = () => {
  return fetch(`/api/categories`).then((res) => res.json());
};

export const getMilestones = () => {
  return fetch(`/api/milestones?_expand=goal`).then((res) => res.json());
};
export const getFilledMilestones = (goalsId) => {
  return fetch(`/api/milestones/${goalsId}`).then((res) => res.json());
};
