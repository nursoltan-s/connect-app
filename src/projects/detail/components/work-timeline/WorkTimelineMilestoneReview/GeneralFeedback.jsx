/**
 * General feedback view section
 */
import React from 'react'
import PT from 'prop-types'
import { withRouter } from 'react-router-dom'

import RichTextEditable from '../../../../../components/RichTextEditable/RichTextEditable'
import LoadingIndicator from '../../../../../components/LoadingIndicator/LoadingIndicator'
import EditIcon from  '../../../../../assets/icons/icon-edit-black.svg'
import { markdownToHTML } from '../../../../../helpers/markdownToState'
import {
  MILESTONE_TYPE,
} from '../../../../../config/constants'
import styles from './GeneralFeedback.scss'

class GeneralFeedback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditGeneralFeedbackForm: false,
    }

    this.updateGeneralFeedback = this.updateGeneralFeedback.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {
      progressId,
    } = nextProps

    // close edit feedback form
    const prevIsUpdatingMilestone = _.get(this.props, `isUpdatingMilestoneInfoWithProcessId.${progressId}`)
    const nextIsUpdatingMilestone = _.get(nextProps, `isUpdatingMilestoneInfoWithProcessId.${progressId}`)
    if (prevIsUpdatingMilestone === true && nextIsUpdatingMilestone === false) {
      this.setState({ showEditGeneralFeedbackForm: false })
    }
  }

  /**
   * update general feedback
   * @param {Object} feedback feedback content
   */
  updateGeneralFeedback(feedback) {
    const {
      updateWorkMilestone,
      progressId,
      milestoneType,
      timelineId,
      match: { params: { workId, milestoneId } },
    } = this.props

    const isFinalDesign = milestoneType === MILESTONE_TYPE.FINAL_DESIGNS
    updateWorkMilestone(
      parseInt(workId),
      timelineId,
      parseInt(milestoneId),
      _.set(
        {},
        `details.content.${isFinalDesign ? 'finalDesigns' : 'checkpointReview'}.generalFeedback`,
        feedback.content
      ),
      [progressId]
    )
  }

  render() {
    const {
      isUpdatingMilestoneInfoWithProcessId,
      generalFeedback,
      progressId
    } = this.props
    const {
      showEditGeneralFeedbackForm
    } = this.state
    return (
      <div className={`${styles['section-general-feedback-container']} ${showEditGeneralFeedbackForm ? styles['is-editing'] : ''}`}>
        <div className={styles['section-header']}>
          <span className={styles['section-title']}>General Feedback</span>
          {!showEditGeneralFeedbackForm && (
            <a
              href="javascript:;"
              onClick={() => { this.setState({ showEditGeneralFeedbackForm: true }) }}
              type="button"
            >
              <EditIcon />
            </a>
          )}
        </div>
        <span className={styles['section-sub-title']}>Please provide overall feedback which is applicable to all submissions</span>

        {showEditGeneralFeedbackForm ? (
          <RichTextEditable
            contentPlaceholder={'New feedback...'}
            content={generalFeedback ? generalFeedback.trim() : ''}
            cancelEdit={() => { this.setState({ showEditGeneralFeedbackForm: false }) }}
            onPost={feedback => this.updateGeneralFeedback(feedback)}
            isCreating={false}
            hasPrivateSwitch={false}
            canUploadAttachment={false}
          />
        ) : (
          <div
            className={`${styles['general-feedback-container']} draftjs-post`}
            dangerouslySetInnerHTML={{__html: markdownToHTML(generalFeedback ? generalFeedback : 'No feedback')}}
          />
        )}
        {isUpdatingMilestoneInfoWithProcessId[progressId] && (
          <div className={styles['loading-container']}>
            <LoadingIndicator />
          </div>
        )}
      </div>
    )
  }
}

GeneralFeedback.propTypes = {
  isUpdatingMilestoneInfoWithProcessId: PT.object.isRequired,
  generalFeedback: PT.string.isRequired,
  progressId: PT.number.isRequired,
  timelineId: PT.number.isRequired,
  updateWorkMilestone: PT.func.isRequired,
  milestoneType: PT.string.isRequired,
}

export default withRouter(GeneralFeedback)
