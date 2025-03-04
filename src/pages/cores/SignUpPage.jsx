import 'rsuite/dist/rsuite.min.css';
import {MantineProvider, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {wPost} from '../../util/request.util.js';
import {useState} from 'react';
import {useAuth} from "../../modules/hooks/useAuth.jsx";

const SignUpPage = ({loginLink}) => {
  const {login} = useAuth();

  const form = useForm({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      phoneNumber: '',
      address: '',
      city: '',
      dob: '',
      gender: '',
      job: '',
    },
    validate: {
      username: (value) => (value ? null : 'Vui lòng nhập tên đăng nhập'), // can be null
      firstName: (value) => (value ? null : 'Vui lòng nhập tên'),
      lastName: (value) => (value ? null : 'Vui lòng nhập họ'),
      email: (value) => {
        if (!value) return 'Vui lòng nhập email';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email không hợp lệ';
        return null;
      },
      password: (value) => (value ? null : 'Yêu cầu nhập mật khẩu'),
      repassword: (value, values) => (value === values.password ? null : 'Mật khẩu không khớp'),
      phoneNumber: (value) => {
        if (value && (value.length < 0 || value.length > 10)) return 'Số điện thoại phải có độ dài từ 0 đến 10 ký tự';
        return null;
      },
      address: () => null, // can be null
      city: () => null, // can be null
      dob: (value) => (value ? null : 'Vui lòng nhập ngày sinh'),
      gender: (value) => (value ? null : 'Vui lòng chọn giới tính'),
      job: () => null, // can be null
    },
  });

  const [error, setError] = useState(null);

  async function handleRegister() {
    form.validate();

    if (form.isValid()) {
      wPost('/v1/auth/sign-up', {
        ...form.values,
      })
          .then((res) => {
            if (res.data.user) {
              login(res.data);
              location.href = '/sign-in';
            }
          })
          .catch((res) => {
            if (res.response && res.response.data.message) {
              setError(res.response.data.message);
            }
          });
    }
    else {
      setError(null);
    }
  }

  return (
      <MantineProvider>
        <div className="min-h-screen w-full p-4 overflow-hidden bg-gray-100 text-gray-900 flex justify-center">
          <div
              className="w-full m-0 bg-white rounded-lg overflow-hidden shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1 bg-green-100 text-center hidden sm:flex">
              <div
                  className="w-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/login_banner.webp")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
              >
                <div
                    className={'w-full h-full opacity-15'}
                    style={{
                      backgroundImage: 'url("/noise.png")',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'repeat-x',
                    }}
                ></div>
              </div>
            </div>
            <div
                className="sm:w-3/5 relative z-10 w-full flex justify-center items-center md:w-1/2 lg:w-5/12 md:p-6 sm:p-12">
              <div className="w-full flex flex-col justify-center items-center">
                <div className={'text-2xl font-bold'}>Đăng Ký</div>
                <div className="w-full px-8 md:px-8 lg:px-20 flex flex-col items-center mt-8">
                  <div className="w-full">
                    <form onSubmit={form.onSubmit(handleRegister)}>
                      <div>
                        <TextInput
                            size={'md'}
                            key={form.key('username')}
                            placeholder={'User Name'}
                            {...form.getInputProps('username')}
                        />
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('firstName')}
                            placeholder={'Tên'}
                            {...form.getInputProps('firstName')}
                        />
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('lastName')}
                            placeholder={'Họ'}
                            {...form.getInputProps('lastName')}
                        />
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('email')}
                            placeholder={'Email'}
                            {...form.getInputProps('email')}
                        />
                      </div>
                      <div className="mt-3">
                        <PasswordInput
                            size={'md'}
                            key={form.key('password')}
                            placeholder={'Mật Khẩu'}
                            {...form.getInputProps('password')}
                        />
                      </div>
                      <div className="mt-3">
                        <PasswordInput
                            size={'md'}
                            key={form.key('repassword')}
                            placeholder={'Nhập lại mật khẩu'}
                            {...form.getInputProps('repassword')}
                        />
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('phoneNumber')}
                            placeholder={'Số điện thoại'}
                            {...form.getInputProps('phoneNumber')}
                        />
                        {form.errors.phoneNumber && (
                            <p className="text-red-500 text-sm">{form.errors.phoneNumber}</p>
                        )}
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('address')}
                            placeholder={'Địa chỉ'}
                            {...form.getInputProps('address')}
                        />
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('city')}
                            placeholder={'Thành phố'}
                            {...form.getInputProps('city')}
                        />
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            type="date"
                            key={form.key('dob')}
                            placeholder={'Ngày sinh'}
                            {...form.getInputProps('dob')}
                        />
                      </div>
                      <div className="mt-3">
                        <select
                            name="gender"
                            value={form.values.gender}
                            onChange={(event) =>
                                form.setFieldValue('gender', event.currentTarget.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-sm"
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                        {form.errors.gender && (
                            <p className="text-red-500 text-sm">{form.errors.gender}</p>
                        )}
                      </div>
                      <div className="mt-3">
                        <TextInput
                            size={'md'}
                            key={form.key('job')}
                            placeholder={'Nghề nghiệp'}
                            {...form.getInputProps('job')}
                        />
                      </div>
                      <div>
                        {error && (
                            <div className={'text-sm mt-1'}>
                              <p className={'text-red-400'}>{error}</p>
                            </div>
                        )}
                      </div>
                      <div className="px-2">
                        <button
                            type={'submit'}
                            className="mt-5 font-semibold bg-primary hover:bg-primaryHover text-white  border border-primary w-full py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                          Đăng Ký
                        </button>
                      </div>
                    </form>
                  </div>
                  <a
                      href={loginLink ? loginLink : '/sign-in'}
                      className={'hover:no-underline hover:text-primary mt-2'}
                  >
                    Đăng nhập
                  </a>
                </div>
                <div
                    className={'hidden w-full h-full opacity-15 z-100'}
                    style={{
                      backgroundImage: 'url("/login_banner.webp")',
                    }}
                >
                  <div
                      className={'w-full h-full opacity-100 -z-1'}
                      style={{
                        backgroundImage: 'url("/noise.png")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat-x',
                      }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MantineProvider>
  );
};

export default SignUpPage;
