import {
	CreateCourseContainer,
	TitleInput,
	DescriptionInput,
	AddAuthorContainer,
	AddAuthorBox,
	DurationBox,
	CourseAuthorsBox,
} from './CreateCourse.styles';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorCarts from './components/AuthorCarts/AuthorCarts';
import AddAuthor from './components/AddAuthor/AddAuthor';
import Duration from './components/Duration/Duration';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorsList } from '../../store/authors/selectors';
import { selectCoursesList } from '../../store/courses/selectors';
import {
	selectCourseTitle,
	selectAddedAuthorsList,
	selectTimeMinutes,
	selectCourseDescription,
} from '../../store/create-course/selectors';
import { setCoursesList } from '../../store/courses/actionCreators';
import {
	setAddedAuthorsList,
	setNotAddedAuthorsList,
	setCourseTitle,
	setCourseDescription,
	setTimeMinutes,
	setTimeHours,
} from '../../store/create-course/actionCreators';

import { useNavigate, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getCurrentDate = () => {
	const today = new Date();
	const day = today.getDate().toString();
	const month = (today.getMonth() + 1).toString(); // JavaScript months are zero-based, so we need to add 1
	const year = today.getFullYear().toString();
	return `${day}/${month}/${year}`;
};

const CreateCourse = () => {
	// alert replacer
	const notify = () =>
		toast('Please fill all fields before creating new course');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// redux vars
	const courseTitle = useSelector(selectCourseTitle);
	const courseDescription = useSelector(selectCourseDescription);
	const addedAuthorsList = useSelector(selectAddedAuthorsList);
	const timeMinutes = useSelector(selectTimeMinutes);

	const clearFormFields = () => {
		dispatch(setCourseTitle(''));
		dispatch(setCourseDescription(''));
		dispatch(setAddedAuthorsList([])); // no need to set NotAdded, i have useEffect that care about it
		dispatch(setTimeMinutes(0));
		dispatch(setTimeHours('00:00'));
	};

	const [isReadyToAddNewCourse, setIsReadyToAddNewCourse] = useState(false);

	//
	const [courseObj, setCourseObj] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	});

	// useEffect to balance added / NOTadded authorLists
	const authorsList = useSelector(selectAuthorsList);
	useEffect(() => {
		// if authorsList changed
		// replace notAddedAuthorList with new authorsList - addedAuthorList
		let newNotAddedAuthorList = [...authorsList];

		// forEach author in already added list i need to remove it from notAdded
		addedAuthorsList.forEach((addedAuthor) => {
			const authorsWithoutAlreadyAdded = newNotAddedAuthorList.filter(
				(notAdded) => notAdded.id !== addedAuthor.id
			);
			newNotAddedAuthorList = [...authorsWithoutAlreadyAdded];
		});
		dispatch(setNotAddedAuthorsList(newNotAddedAuthorList));
	}, [authorsList, addedAuthorsList, dispatch]);

	// useEffect to regenerate new course object
	useEffect(() => {
		const authorsIdsList = addedAuthorsList.map((author) => author.id);

		const newCourseObj = {
			id: crypto.randomUUID(),
			title: courseTitle,
			description: courseDescription,
			creationDate: getCurrentDate(),
			duration: timeMinutes,
			authors: authorsIdsList,
		};
		setCourseObj(newCourseObj);
	}, [courseTitle, courseDescription, addedAuthorsList, timeMinutes]);

	// useEffect to check if current course object is ready to be added
	useEffect(() => {
		if (
			!!courseObj.title &&
			!!courseObj.description &&
			courseObj.authors.length > 0 &&
			courseObj.duration !== 0
		) {
			setIsReadyToAddNewCourse(true);
		} else {
			setIsReadyToAddNewCourse(false);
		}
	}, [courseObj]);

	const coursesList = useSelector(selectCoursesList);
	const createCourseButtonHandler = (event) => {
		event.preventDefault();
		if (!isReadyToAddNewCourse) {
			notify(); // toast looks nicer )
			// alert('Please fill all fields before creating new course');
			return;
		}

		dispatch(setCoursesList([...coursesList, courseObj]));

		// clear fields
		clearFormFields();
		// navigate back to courses
		navigate('/courses');
	};

	const titleInputHandler = (event) => {
		event.preventDefault();
		dispatch(setCourseTitle(event.target.value));
	};

	const descriptionInputHandler = (event) => {
		event.preventDefault();
		dispatch(setCourseDescription(event.target.value));
	};

	return (
		<CreateCourseContainer className='course-container'>
			<Link to='/courses' onClick={clearFormFields}>
				↩️ Back to courses
			</Link>
			<TitleInput>
				<Input
					labelText='Title'
					placeholderText='Enter title...'
					onChange={titleInputHandler}
					value={courseTitle}
				/>
			</TitleInput>
			<Button onClick={createCourseButtonHandler}>Create course</Button>
			<DescriptionInput>
				<Input
					isTextArea={true}
					labelText='Description'
					placeholderText='Enter description...'
					onChange={descriptionInputHandler}
					value={courseDescription}
				/>
			</DescriptionInput>
			<AddAuthorContainer className='AddAuthorContainer'>
				<AddAuthorBox className='AddAuthorBox'>
					<AddAuthor />
				</AddAuthorBox>
				<DurationBox className='DurationBox'>
					<Duration />
				</DurationBox>
				<CourseAuthorsBox>
					<AuthorCarts />
				</CourseAuthorsBox>
			</AddAuthorContainer>
		</CreateCourseContainer>
	);
};

export default CreateCourse;
/*
{
  id: string
  title: string
  description: string
  creationDate: string
  duration: number
  authors: [authorId]
  }
  */
