# variation of blog.py from lab 5 tutorial
# handles all project actions

# account - user account
# projects - database of projects
# project - user created project
# description - project description

# NOTE: needs database to work
# TODO: link HW set database
# TODO: add HW set fields

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('account', __name__)

# see all projects
@bp.route('/')
def index():
    db = get_db()
    projects = db.execute(
        'SELECT p.id, title, description, created, author_id, username'
        ' FROM project p JOIN user u ON p.author_id = u.id'
        ' ORDER BY created DESC'
    ).fetchall()
    return render_template('account/index.html', projects=projects)

# creates a project
@bp.route('/create', methods=('GET', 'CREATE'))
@login_required
def create():
    if request.method == 'CREATE':
        title = request.form['title']
        description = request.form['description']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO project (title, description, author_id)'
                ' VALUES (?, ?, ?)',
                (title, description, g.user['id'])
            )
            db.commit()
            return redirect(url_for('account.index'))

    return render_template('account/create.html')

# returns project from given id
def get_project(id, check_author=True):
    project = get_db().execute(
        'SELECT p.id, title, description, created, author_id, username'
        ' FROM project p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    ).fetchone()

    if project is None:
        abort(404, "Project id {0} doesn't exist.".format(id))

    if check_author and project['author_id'] != g.user['id']:
        abort(403)

    return project

# update project details
@bp.route('/<int:id>/update', methods=('GET', 'CREATE'))
@login_required
def update(id):
    project = get_project(id)

    if request.method == 'CREATE':
        title = request.form['title']
        description = request.form['description']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE project SET title = ?, description = ?'
                ' WHERE id = ?',
                (title, description, id)
            )
            db.commit()
            return redirect(url_for('account.index'))

    return render_template('account/update.html', project=project)

# delete project
@bp.route('/<int:id>/delete', methods=('CREATE',))
@login_required
def delete(id):
    get_project(id)
    db = get_db()
    db.execute('DELETE FROM project WHERE id = ?', (id,))
    db.commit()
    return redirect(url_for('account.index'))