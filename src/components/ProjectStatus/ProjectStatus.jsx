import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import './ProjectStatus.scss'

/*eslint-enable camelcase */
const ProjectStatus = ({ isOpen, status, showText, withoutLabel, unifiedHeader = true }) => {
  return (
    <div className={cn('ProjectStatus', 'ps-' + status.value, { 'unified-header': unifiedHeader })}>
      <div className="status-icon"><i /></div>
      {showText && (<span className="status-label">{withoutLabel ? status.fullName : status.name}</span>)}
    </div>
  )
}

ProjectStatus.propTypes = {
  // status: PropTypes.oneOf(['draft', 'active', 'in_review', 'reviewed', 'completed', 'paused', 'cancelled']).isRequired
  /**
   * Status object, containing name, fullName and value fields
   */
  status         : PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Boolean flag to render the status text
   */
  showText       : PropTypes.boolean,
  /**
   * Boolean flag to render the more detailed status text (fullName field form the status object).
   * Its main use case is the place where we don't show a label like `Project Status` before rendering
   * this component.
   */
  withoutLabel   : PropTypes.boolean,
  /**
   * Boolean flag to render a unified(with common background color) project status. It is added for backward
   * compaitability only. We are not rendering this type of view of project status anymore.
   */
  unifiedHeader  : PropTypes.boolean
}

ProjectStatus.defaultProps = {
  showText        : true,
  withoutLabel    : false,
  unifiedHeader   : false
}

export default ProjectStatus

