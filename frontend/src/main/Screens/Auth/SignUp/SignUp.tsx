import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import {Button, Input, Spacer} from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import cn from "clsx";
import {validEmail} from "@utils/validations/valid-email";
import {TRegister} from "@/types/TAuth";
import {EyeFilledIcon, EyeSlashFilledIcon} from "../Login/Icons/Icons";
import {useState} from "react";

const SignUp = () => {

  const { register } = useActions();
  const { isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>();

  const submit: SubmitHandler<TRegister> = (data) => {
    register(data);
  };

  return (
    <form
      className="flex flex-col w-full sm:w-1/3 px-5 gap-2"
      onSubmit={handleSubmit(submit)}
    >
      <Controller
        name="phone_number"
        control={control}
        rules={{
          required: "Номер телефона обязателен!",
          pattern: {
            value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
            message:
              "Введите полный номер телефона в формате +7(XXX)-XXX-XX-XX",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <InputMask
              onChange={onChange}
              value={value}
              mask="+7(999)-999-99-99"
              placeholder="+7(___)-___-__-__"
              maskChar="_"
              className={cn(
                "px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-foreground-500 rounded-xl",
                {
                  "bg-danger-50": !!error?.message,
                  "bg-default-100": !error?.message,
                }
              )}
            />
            {errors.phone_number && (
              <span className="text-danger text-xs">
                {errors.phone_number.message}
              </span>
            )}
          </>
        )}
      />
        <Controller
          control={control}
          name="email"
          key="email"
          rules={{
            required: "Это поле обязательно!",
            pattern: {
              value: validEmail,
              message: "Неверно введен email",
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="email"
              fullWidth
              variant="flat"
              size="lg"
              placeholder="Email"
              type="email"
              required
              value={value}
              onChange={onChange}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          key="password"
          rules={{
            required: "Это поле обязательно!",
            minLength: {
              value: 6,
              message: "Минимальная длина пароля 6 символов",
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="password"
              variant="flat"
              fullWidth
              size="lg"
              placeholder="Пароль"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="h-[25px] w-[25px] text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="h-[25px] w-[25px] text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              required
              value={value}
              onChange={onChange}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
      <Spacer y={1} />
      <Button isLoading={isLoading} type="submit" color="primary">
        Зарегистрировать
      </Button>
    </form>
  );
};

export default SignUp;
