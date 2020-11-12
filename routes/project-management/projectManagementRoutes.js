/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const milestoneRouter = require('./milestoneRoutes');
const projectActivityRouter = require('./projectActivityRoutes');
const projectAdminsRouter = require('./projectAdminsRoutes');
const projectDiscussionCommentsRouter = require('./projectDiscussionCommentsRoutes');
const projectDiscussionsRouter = require('./projectDiscussionsRoutes');
const projectEntriesRouter = require('./projectEntriesRoutes');
const projectFilesRouter = require('./projectFilesRoutes');
const projectMembersRouter = require('./projectMembersRoutes');
const projectNotesRouter = require('./projectNotesRoutes');
const projectTaskFilesRouter = require('./projectTaskFilesRoutes');
const projectTaskStatusRouter = require('./projectTaskStatusRoutes');
const taskChecklistEntriesRouter = require('./taskChecklistEntriesRoutes');
const taskChecklistStatusRouter = require('./taskChecklistStatusRoutes');
const taskEntriesRouter = require('./taskEntriesRoutes');
const taskRemindersRouter = require('./taskRemindersRoutes');
const taskTimersRouter = require('./taskTimersRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Project Management Routes');
  next();
});

/* ROUTES */
router.use('/milestone', milestoneRouter);
router.use('/activity', projectActivityRouter);
router.use('/admins', projectAdminsRouter);
router.use('/discussion-comments', projectDiscussionCommentsRouter);
router.use('/discussions', projectDiscussionsRouter);
router.use('/entries', projectEntriesRouter);
router.use('/files', projectFilesRouter);
router.use('/members', projectMembersRouter);
router.use('/notes', projectNotesRouter);
router.use('/task-files', projectTaskFilesRouter);
router.use('/task-status', projectTaskStatusRouter);
router.use('/task-checklist-entries', taskChecklistEntriesRouter);
router.use('/task-checklist-status', taskChecklistStatusRouter);
router.use('/task-entries', taskEntriesRouter);
router.use('/task-reminders', taskRemindersRouter);
router.use('/task-timers', taskTimersRouter);


module.exports = router;