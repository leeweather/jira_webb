import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    try {
      login(values);
    } catch (error) {
      onError(error)
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
