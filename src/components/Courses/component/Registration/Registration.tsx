import {
	RegistrationContainer,
	RegistrationForm,
	RegistrationFormText,
} from './Registration.styles';

import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { postData } from '../../../../helpers/dataFetchers';

const defaultFormFields = {
	name: 'Test',
	email: 'test@example.com',
	password: '123123',
};
const notify = (message: string) => toast(message);

const Registration = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { name, email, password } = formFields;

	const navigate = useNavigate();

	const resetFormFields = () => setFormFields(defaultFormFields);

	const inputChangeHandler = ({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement>) => {
		setFormFields({ ...formFields, [name]: value });
	};

	const fetchHandler = async (): Promise<boolean> => {
		try {
			const data = await postData('http://127.0.0.1:4000/register', formFields);

			if (data.successful) {
				notify('🟢 ' + data.result);
				return true;
			}

			if (!data.successful && data.errors) {
				notify(`🛑 Errors: ${data.errors.join(', ')}`);
				return false;
			}
		} catch (error) {
			notify('🔴 Error');
			console.error(`Fetch error: ${error}`);
		}
		return false;
	};

	const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetchHandler().then((result) => {
			if (result) {
				resetFormFields();
				navigate('/login');
			}
			// else nothig, user stay on this page until registration compl
		});
	};

	return (
		<RegistrationContainer>
			<RegistrationForm onSubmit={submitFormHandler}>
				<CustomTitle>Registration</CustomTitle>
				<Input
					labelText='Name'
					placeholderText='Enter name'
					required
					type='text'
					onChange={inputChangeHandler}
					name='name'
					value={name}
				/>
				<Input
					labelText='Email'
					placeholderText='Enter email'
					required
					type='email'
					onChange={inputChangeHandler}
					name='email'
					value={email}
				/>
				<Input
					labelText='Password'
					placeholderText='Enter password'
					required
					type='password'
					onChange={inputChangeHandler}
					name='password'
					value={password}
				/>
				<Button>Registration</Button>
				<RegistrationFormText>
					If you have an account you can <Link to='/login'>Login</Link>
				</RegistrationFormText>
			</RegistrationForm>
		</RegistrationContainer>
	);
};

export default Registration;