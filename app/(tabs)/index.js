import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlevalidate = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    bookingDate: Yup.string().required('Booking Date is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Booking submitted successfully!');
      resetForm();
    }, 1500);
  };

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFieldValue('bookingDate', selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Formik
        initialValues={{ fullName: '', email: '', bookingDate: '' }}
        validationSchema={handlevalidate}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.mainContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('fullName')}
              value={values.fullName}
              placeholder="Enter your full name"
            />
            {errors.fullName && touched.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('email')}
              value={values.email}
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.fieldLabel}>Booking Date</Text>
            <TextInput
              style={styles.inputField}
              value={values.bookingDate}
              placeholder="Select a date"
              onFocus={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={values.bookingDate ? new Date(values.bookingDate) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(event, date) => handleDateChange(event, date, setFieldValue)}
                minimumDate={new Date()}
              />
            )}

            <View style={styles.buttonWrapper}>
              <Button
                title={loading ? 'Submitting' : 'Submit'}
                onPress={handleSubmit}
                disabled={loading}
                color={loading ? '#888' : '#007BFF'}
              />
              {loading && (
                <ActivityIndicator style={styles.spinner} size="small" color="#007BFF" />
              )}
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  spinner: {
    marginTop: 10,
  },
});
