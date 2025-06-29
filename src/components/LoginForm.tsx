import { Alert, Button, Field, Input, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { LoginData } from "../services/AuthClient"
import { FC, useState } from "react";

interface Props {
    submitter: (data: LoginData) => Promise<boolean>;
}

const LoginForm: FC<Props> = ({submitter}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField
  } = useForm<LoginData>()

  const [isAlert, setAlert] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await submitter(data);
    if (!res) {
      setAlert(true);
    } else {
      reset();
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.email}>
          <Field.Label>email</Field.Label>
          <Input {...register("email", {required:true})} onFocus={() => {
            resetField("email");
            setAlert(false);
          }
          } />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>password</Field.Label>
          <Input {...register("password", {required: true})} type={"password"}  onFocus={() => {
            resetField("password");
            setAlert(false);
          }} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
        {isAlert && 
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>Invalid credentials</Alert.Title>
          </Alert.Root>
        }
      </Stack>
    </form>
  )
}

export default LoginForm;
