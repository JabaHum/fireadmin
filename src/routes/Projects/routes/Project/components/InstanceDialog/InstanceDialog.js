import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import FilesUploader from '../FilesUploader'
import ServiceAccounts from '../ServiceAccounts'
import { required } from 'utils/form'
import classes from './InstanceDialog.scss'

export const InstanceDialog = ({
  onFilesDrop,
  submit,
  reset,
  submitting,
  pristine,
  serviceAccounts,
  selectedAccounts,
  onRequestClose,
  initialValues,
  onAccountClick,
  ...other
}) => (
  <Dialog
    title="Add Instance"
    actions={[
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => {
          reset()
          onRequestClose && onRequestClose()
        }}
      />,
      <FlatButton
        primary
        label="Create"
        style={{ marginLeft: '1.5rem' }}
        disabled={pristine || submitting}
        onTouchTap={submit}
      />
    ]}
    {...other}>
    <div className={classes.body}>
      <Field
        component={TextField}
        name="name"
        floatingLabelText="Instance Name"
        validate={required}
      />
      <Field
        component={TextField}
        name="databaseURL"
        floatingLabelText="Database URL"
      />
      <Field
        component={TextField}
        name="description"
        floatingLabelText="Instance Description"
      />
      <div>
        <h4>Service Account</h4>
        {serviceAccounts ? (
          <ServiceAccounts
            serviceAccounts={serviceAccounts}
            selectedAccounts={selectedAccounts}
            onAccountClick={onAccountClick}
          />
        ) : (
          <div>No Service Accounts </div>
        )}
        <FilesUploader
          onFilesDrop={onFilesDrop}
          label="to upload Service Account"
        />
      </div>
    </div>
  </Dialog>
)

InstanceDialog.propTypes = {
  serviceAccounts: PropTypes.object,
  selectedAccounts: PropTypes.object,
  onRequestClose: PropTypes.func,
  onAccountClick: PropTypes.func,
  onFilesDrop: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired, // captured in other
  initialValues: PropTypes.object, // from reduxForm
  submit: PropTypes.func.isRequired, // from reduxForm
  reset: PropTypes.func.isRequired, // from reduxForm
  submitting: PropTypes.bool.isRequired, // from reduxForm
  pristine: PropTypes.bool.isRequired // from reduxForm
}

export default reduxForm({
  form: 'newInstance',
  enableReinitialize: true // Handle new/edit modal: reinitialize with other env to edit
})(InstanceDialog)
