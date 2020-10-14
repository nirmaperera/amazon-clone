import React, { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';

import './LocationSearchInput.css';

function LocationSearchInput(props) {
	const [address, setAddress] = useState('');
	const [{ }, dispatch] = useStateValue();

	const handleChange = address => {
		setAddress(address);
		console.log(address, 'my address');
	};

	const handleSelect = address => {
		console.log('hi')
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => console.log('Success', latLng),)
			.catch(error => console.error('Error', error));
		handleAddress(address);
	};

	const handleAddress = (address) => {
		dispatch({
			type: 'ADD_ADDRESS',
			address: address
		});
	}

	return (
		<PlacesAutocomplete
			value={address}
			onChange={handleChange}
			onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div>
					<input
						{...getInputProps({
							placeholder: 'Search for a address...',
							className: 'location-search-input',
						})}
					/>
					<div className="autocomplete-dropdown-container">
						{loading && <div>Loading...</div>}
						{suggestions.map(suggestion => {
							const className = suggestion.active
								? 'suggestion-item--active'
								: 'suggestion-item';
							// inline style for demonstration purpose
							const style = suggestion.active
								? { backgroundColor: '#fafafa', cursor: 'pointer' }
								: { backgroundColor: '#ffffff', cursor: 'pointer' };
							return (
								<div>
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span onClick={handleSelect}>{suggestion.description}</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	);
}

export default LocationSearchInput;