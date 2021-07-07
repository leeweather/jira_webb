import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "scrrens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
  );
};

const PageHeader = styled.header`
  height: 6rem;
`;

// const Main = styled.main`
//   height: calc(100vh-6rem);
// `;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
`;

const HeaderLeft = styled(Row)`
display: flex;
align-items: center;
`;

const HeaderRight = styled.div``;

const Main = styled.main``;
