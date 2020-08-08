import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './AddNewIdea.css';
import '../Overlay/Overlay.css';
import { close, submit, error, clean } from './actions';
import { fetchAllIdeas } from '../Ideas/actions';
import handle from '../../support/handlers';
import ideaService from '../../services/idea'

const AddNewIdea = ({
  team,
  dispatch,
  isOpen,
  id,
  errorMessage
}) => {

	dispatch = useDispatch();

	const [ideaName, setIdeaName] = useState('');
	const [description, setDescription] = useState('');
	const [submitFrom, setSubmitForm] = useState(false);
	const [showThankYou, setShowThankYou] = useState(false);

	[isOpen, id, errorMessage] = useSelector(state => [
		state.addNewIdeaReducer.open,
		state.addNewIdeaReducer.content.id,
		state.addNewIdeaReducer.error
	]);

	const cleanState = () => {
		setIdeaName('');
		setDescription('');
		setSubmitForm(false);
		dispatch(clean());
	};

	const handleChange = useCallback(
		(target) => {
			const field = target.name;
			const value = target.value;
			switch (field) {
				case 'ideaName':
					return setIdeaName(value);
				case 'description':
					return setDescription(value);
			}

		}, []
	);

	const closeOverlay = useCallback(
		() => {
			dispatch(close())
		}, []
	);

	const addNewIdea = useCallback(
		(e) => {
			e.preventDefault();
			setSubmitForm(true);
			return false
		}, []
	);

	useEffect(() => {
		if (submitFrom) {
			const data = {
				name: ideaName,
				description: description
			};
			ideaService.post(data)
				.then(() => {
					dispatch(fetchAllIdeas());
					setShowThankYou(true);
					cleanState();
					setTimeout(() => {
						dispatch(close());
						setShowThankYou(false);
					}, 2000)
				})
				.catch((errorResponse) => {
					errorResponse.then(err => {
						dispatch(error(err.message));
						setSubmitForm(false);
					})
				})
		}
	}, [submitFrom]);

	useEffect(() => {
		handle.scrollElToCenter()
	},[isOpen]);

	return (
		<div className="AddNewIdea">
			{ isOpen
				&& <div className="Overlay">
					<div className="Overlay-Container">
						{ !showThankYou
							&& <div className="Overlay-Box">
							<div className="Overlay-Close" onClick={() => closeOverlay()}>
								close
							</div>
							<div className="AddNewIdea-Title">
								Add new idea
							</div>
							{
								errorMessage
								&& <div className="Error-Message">{
									errorMessage
								}</div>
							}
							<form action="" onSubmit={(e) => addNewIdea(e)} method="POST">
								<div>
									<label htmlFor="ideaName" className={`${ideaName !== '' ? 'focus' : ''}`}>Idea Name*</label>
									<input type="text" name="ideaName" required value={ideaName}
									       onFocus={(e) => handle.focus(e.currentTarget)}
									       onBlur={(e) => handle.blur(e.currentTarget)}
									       onChange={(e) => handleChange(e.target)}/>
								</div>
								<div>
									<label htmlFor="description" className={`align-top ${description !== '' ? 'focus' : ''}`}>Idea Description*</label>
									<textarea rows="5" name="description" required value={description}
									       onFocus={(e) => handle.focus(e.currentTarget)}
									       onBlur={(e) => handle.blur(e.currentTarget)}
									       onChange={(e) => handleChange(e.target)}/>
								</div>
								<button type="submit">Submit</button>
							</form>
						</div>
						}
						{	showThankYou
							&& <div className="Overlay-Box">
							<div className="Overlay-Close" onClick={() => closeOverlay()}>
								close
							</div>
							<div className="Success-Message">Woohoo.. It was successful!</div>
						</div>
						}
						</div>
					</div>
			}
		</div>
	);
};

export default AddNewIdea;