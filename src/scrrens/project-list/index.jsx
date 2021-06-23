import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { changeObject, useDebounce, useMount } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(param, 2000);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(changeObject(debounceParams))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
