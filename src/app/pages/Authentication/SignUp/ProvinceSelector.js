import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Select, MenuItem, TextField, Box } from '@mui/material';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from 'vn-provinces';

const ProvinceSelector = ({ address, onAddressChange, formErrors }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);

  useEffect(() => {
    const fetchCities = () => {
      const provinces = getProvinces().map((province) => ({
        value: province.code,
        label: province.name,
      }));
      setCities(provinces);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (address.province) {
      const selectedCity = cities.find((c) => c.label === address.province);
      if (selectedCity) {
        const districtsList = getDistrictsByProvinceCode(selectedCity.value).map((district) => ({
          value: district.code,
          label: district.name,
        }));
        setDistricts(districtsList);
        setTowns([]);
      } else {
        setDistricts([]);
        setTowns([]);
      }
    } else {
      setDistricts([]);
      setTowns([]);
    }
  }, [address.province, cities]);

  useEffect(() => {
    if (address.district) {
      const selectedDistrict = districts.find((d) => d.label === address.district);
      if (selectedDistrict) {
        const wardsList = getWardsByDistrictCode(selectedDistrict.value).map((ward) => ({
          value: ward.code,
          label: ward.name,
        }));
        setTowns(wardsList);
      } else {
        setTowns([]);
      }
    } else {
      setTowns([]);
    }
  }, [address.district, districts]);

  const handleChange = (field, value) => {
    const newAddress = { ...address, [field]: value };
    if (field === 'province') {
      newAddress.district = '';
      newAddress.town = '';
    } else if (field === 'district') {
      newAddress.town = '';
    }
    onAddressChange(newAddress);
  };

  return (
    <FormControl fullWidth>
      <FormLabel>Địa chỉ</FormLabel>
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <FormControl sx={{  flexGrow: 1 }}>
          <Select
            value={address.province || ''}
            onChange={(e) => handleChange('province', e.target.value)}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Chọn tỉnh/thành phố
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.value} value={city.label}>
                {city.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{  flexGrow: 1 }}>
          <Select
            value={address.district || ''}
            onChange={(e) => handleChange('district', e.target.value)}
            displayEmpty
            required
            disabled={!address.province}
          >
            <MenuItem value="" disabled>
              Chọn quận/huyện
            </MenuItem>
            {districts.map((district) => (
              <MenuItem key={district.value} value={district.label}>
                {district.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{  flexGrow: 1 }}>
          <Select
            value={address.town || ''}
            onChange={(e) => handleChange('town', e.target.value)}
            displayEmpty
            required
            disabled={!address.district}
          >
            <MenuItem value="" disabled>
              Chọn phường/xã
            </MenuItem>
            {towns.map((town) => (
              <MenuItem key={town.value} value={town.label}>
                {town.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl fullWidth>
        <TextField
          value={address.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          placeholder="Số nhà, tên đường"
          fullWidth
          required
          variant="outlined"
          error={Boolean(formErrors.address)}
          helperText={formErrors.address || ''}
        />
      </FormControl>
    </FormControl>
  );
};

export default ProvinceSelector;
