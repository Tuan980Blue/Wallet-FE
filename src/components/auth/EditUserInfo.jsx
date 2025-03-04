import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const EditUserInfo = () => {
  const form = useForm({
    name: "registerForm",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      dob: dayjs(),
      gender: null,
      userName: "",
    },
    validate: {
      userName: (email) => {
        if (email === "") {
          return "Hãy nhập email";
        }
      },
      password: (pass) => {
        if (pass === "") {
          return "Yêu cầu điền mât khẩu";
        }
      },
      lastName: (lastName) => {
        if (lastName === "") {
          return "Không được để trống";
        }
      },
      firstName: (firstName) => {
        if (firstName === "") {
          return "Không được để trống";
        }
      },
    },
  });

  return (
    <form className="w-full bg-white p-4 rounded-lg" action="">
      <div>
        <div className={"flex gap-3"}>
          <TextInput
            className={"w-full"}
            {...form.getInputProps("lastName")}
            placeholder="Họ"
            size={"md"}
            label="Họ"
            required
          />
          <TextInput
            className={"w-full"}
            {...form.getInputProps("firstName")}
            placeholder="Tên"
            size={"md"}
            label="Tên"
            required
          />
        </div>
        <TextInput
          placeholder="Email"
          {...form.getInputProps("email")}
          label="Email"
          size={"md"}
          required
        />
        <PasswordInput
          placeholder="Mật khẩu"
          {...form.getInputProps("password")}
          label="Mật khẩu"
          type="password"
          size={"md"}
          required
        />
        <PasswordInput
          placeholder="Nhập lại mật khẩu"
          {...form.getInputProps("confirmPassword")}
          label="Nhập lại mật khẩu"
          type="password"
          size={"md"}
          required
        />

        <DateInput
          size={"md"}
          placeholder="Ngày sinh"
          {...form.getInputProps("dob")}
          label="Ngày sinh"
          required
        />
      </div>
      <div className={"flex justify-end mt-3"}>
        <Button onClick={onNextHandle} type={"submit"}>
          Đăng ký
        </Button>
      </div>
    </form>
  );
};

export default EditUserInfo;
