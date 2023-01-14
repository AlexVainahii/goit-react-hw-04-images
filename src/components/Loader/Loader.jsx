import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';
export const Loader = ({ isLoading }) => {
  return (
    <>
      <Dna
        visible={isLoading}
        height="150"
        width="150"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        wrapperClassName="dna-wrapper"
      />
    </>
  );
};
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
