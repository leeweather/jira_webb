import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { changeObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: changeObject(debounceParams) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
