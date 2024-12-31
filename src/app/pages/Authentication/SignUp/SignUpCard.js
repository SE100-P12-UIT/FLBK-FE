import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../../services/authService";
import ProvinceSelector from "./ProvinceSelector";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  maxWidth: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUpCard() {
  const [formErrors, setFormErrors] = React.useState({});
  const [birthDate, setBirthDate] = React.useState(null);
  const [address, setAddress] = React.useState({
    province: "",
    district: "",
    town: "",
    street: "",
  });
  const navigate = useNavigate();

  const handleChangeAddress = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  const validateForm = (data, birthDate, address) => {
    const errors = {};

    // Validate individual fields
    if (!data.name) errors.name = "Họ và tên là bắt buộc.";
    if (!data.email) errors.email = "Email là bắt buộc.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email không hợp lệ.";
    if (!data.password) errors.password = "Mật khẩu là bắt buộc.";
    if (!data.phone) errors.phone = "Số điện thoại là bắt buộc.";
    else if (!/^\d{10}$/.test(data.phone)) errors.phone = "Số điện thoại không hợp lệ.";
    if (!data.cccd) errors.cccd = "CCCD là bắt buộc.";
    if (!birthDate) errors.birthDate = "Ngày sinh là bắt buộc.";

    // Validate address
    if (!address.province || !address.district || !address.town) {
      errors.address = "Địa chỉ là bắt buộc.";
    }

    return errors;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      cccd: data.get("cccd"),
    };

    const errors = validateForm(formData, birthDate, address);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload = {
      ...formData,
      phoneNumber: formData.phone,
      dateOfBirth: birthDate ? dayjs(birthDate).format("YYYY-MM-DD") : "",
      citizenId: formData.cccd,
      address: {
        district: address.district,
        province: address.province,
        street: address.street,
        town: address.town,
      }
    };

    console.log(payload);

    try {
      const response = await AuthService.register(payload);
      if (response.status === 201) {
        toast.success("Đăng ký thành công!");
        navigate("/signin/");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình đăng ký");
    }
  };

  return (
    <Card variant="outlined" sx={{minWidth:'60vw'}}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        Đăng ký
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {/* Grid for Họ và tên, Email */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="name">Họ và tên</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Nguyễn Văn A"
                required
                variant="outlined"
                error={Boolean(formErrors.name)}
                helperText={formErrors.name || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                variant="outlined"
                error={Boolean(formErrors.email)}
                helperText={formErrors.email || ""}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl>
          <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            required
            fullWidth
            variant="outlined"
            error={Boolean(formErrors.password)}
            helperText={formErrors.password || ""}
          />
        </FormControl>

        {/* Grid for Số điện thoại, CCCD, Ngày sinh */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={3.5}>
            <FormControl fullWidth>
              <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
              <TextField
                id="phone"
                name="phone"
                placeholder="0123456789"
                required
                variant="outlined"
                error={Boolean(formErrors.phone)}
                helperText={formErrors.phone || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <FormControl fullWidth>
              <FormLabel htmlFor="cccd">CCCD</FormLabel>
              <TextField
                id="cccd"
                name="cccd"
                placeholder="xxx xxx xxxxxx"
                required
                variant="outlined"
                error={Boolean(formErrors.cccd)}
                helperText={formErrors.cccd || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5}>
            <FormControl fullWidth>
              <FormLabel htmlFor="birthDate">Ngày sinh</FormLabel>
              <DatePicker
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant="outlined"
                    error={Boolean(formErrors.birthDate)}
                    helperText={formErrors.birthDate || ""}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Address Selector */}
        <ProvinceSelector
          address={address}
          onAddressChange={handleChangeAddress}
          formErrors={formErrors}
        />

        <Button type="submit" fullWidth variant="contained">
          Đăng ký
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Đã có tài khoản?{" "}
          <span>
            <Link href="/signin/" variant="body2" sx={{ alignSelf: "center" }}>
              Đăng nhập
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
