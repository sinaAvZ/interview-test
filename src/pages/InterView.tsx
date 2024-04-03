import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { userInfo } from "../libs/domain/UserInfo";
import { Controller, useForm } from "react-hook-form";
import { createResolver } from "../libs/domain/createResolver";
import { Alert, Button, Grid, Input, MenuItem, Select } from "@mui/material";
import { useSendUserInfoFromMutation } from "../libs/data-layer/mutations/useSendUserInfoFromMutation";
export interface UserInfo {
  gender: "male" | "female";
  fullName: string;
}
const resolver = createResolver<UserInfo>({
  gender: userInfo.gender(),
  fullName: userInfo.fullName().max(30),
});

const InterView = () => {
  const mutation = useSendUserInfoFromMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm<UserInfo>({ mode: "onBlur", resolver: resolver });

  const submitHandler = handleSubmit((dto) => {
    try {
      mutation.mutate(dto);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <form onSubmit={submitHandler}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            This is interview test
          </Typography>
        </Box>
        <Grid spacing={2} container justifyContent={"center"}>
          <Grid item xs={6} mb={8}>
            <Input
              fullWidth
              error={!!errors.fullName?.message}
              placeholder="Enter your full name"
              {...register("fullName")}
            />
            {errors.fullName?.message ? (
              <Alert severity="error">{errors.fullName?.message}</Alert>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <Controller
              defaultValue="male"
              render={({ field: { onChange, value } }) => (
                <Select
                  fullWidth
                  error={!!errors.gender?.message}
                  onChange={onChange}
                  value={value}
                  label="Age"
                  variant="standard"
                  defaultValue="male">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              )}
              name="gender"
              control={control}
            />
            {errors.gender?.message ? (
              <Alert severity="error">{errors.gender?.message}</Alert>
            ) : null}
          </Grid>
          <Button
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained">
            Submit
          </Button>
        </Grid>
      </Container>
    </form>
  );
};
export default InterView;
