import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Select, MenuItem, TextField, Box } from '@mui/material';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from 'vn-provinces';

const ProvinceSelector = ({ address, onAddressChange, formErrors }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

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
        setWards([]);
      } else {
        setDistricts([]);
        setWards([]);
      }
    } else {
      setDistricts([]);
      setWards([]);
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
        setWards(wardsList);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  }, [address.district, districts]);

  const handleChange = (field, value) => {
    const newAddress = { ...address, [field]: value };
    if (field === 'province') {
      newAddress.district = '';
      newAddress.ward = '';
    } else if (field === 'district') {
      newAddress.ward = '';
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
          marginBottom:'16px',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <FormControl fullWidth>
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
        <FormControl fullWidth>
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
        <FormControl fullWidth>
          <Select
            value={address.ward || ''}
            onChange={(e) => handleChange('ward', e.target.value)}
            displayEmpty
            required
            disabled={!address.district}
          >
            <MenuItem value="" disabled>
              Chọn phường/xã
            </MenuItem>
            {wards.map((ward) => (
              <MenuItem key={ward.value} value={ward.label}>
                {ward.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl fullWidth>
        <TextField
          value={address.detail || ''}
          onChange={(e) => handleChange('detail', e.target.value)}
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
