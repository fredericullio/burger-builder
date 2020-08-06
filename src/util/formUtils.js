export const createConfig = (
    component,
    type,
    label,
    value,
    minLength = null,
    maxLength = null,
    postalCode = null
  ) => {
    switch (component) {
      case 'textfield':
        return {
          component: component,
          elementConfig: {
            type: type,
            label: label,
          },
          value: value,
          validation: {
            required: true,
            minLength: minLength,
            maxLength: maxLength,
            isEmail: type === 'email',
            isPostCode: postalCode
          },
          valid: false,
          touched: false,
          errorMsg: null,
        };
      case 'select':
        return {
          component: component,
          elementConfig: {
            label: label,
            options: [
              { value: 'fastest', display: 'Fastest' },
              { value: 'cheapest', display: 'Cheapest' },
            ],
          },
          value: value,
          validation: {
            required: true,
          },
          valid: false,
        };
      default:
        return null;
    }
  };

  export const checkFieldValidity = (value, rules) => {
    let isValid = true;
    let helperText = null;

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
      if (!isValid) {
        helperText = 'This field is required';
      }
    }

    if (rules.minLength && isValid) {
      isValid = value.trim().length >= rules.minLength;
      if (!isValid) {
        helperText = `This field requires at least ${rules.minLength} characters`;
      }
    }

    if (rules.maxLength && isValid) {
      isValid = value.trim().length <= rules.maxLength;
      if (!isValid) {
        helperText = `This field requires no more than ${rules.minLength} characters`;
      }
    }

    if (rules.isEmail && isValid) {
        const emailRegex = /.{3,}@.{3,}\.(com|pl|net)/;
        isValid = emailRegex.test(value);
        if(!isValid) {
          helperText = 'Typed value is not a proper email'
        }
    }

    if (rules.isPostCode && isValid) {
      const postCodeRegex = /^\d\d-\d\d\d$/;
      isValid = postCodeRegex.test(value);
      if (!isValid) {
        helperText = 'Typed value is not a proper postal code'
      }
    }

    return { isValid, helperText };
  };

  export const checkFormValidity = (form) => {
    const inputFields = Object.keys(form);

    for (let i = 0; i < inputFields.length; i++) {
      if (!form[inputFields[i]].valid) {
        return false;
      }
    }
    return true;
  };