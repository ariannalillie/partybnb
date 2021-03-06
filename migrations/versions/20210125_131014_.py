"""empty message

Revision ID: a98e2ae15892
Revises: ffdc0a98111c
Create Date: 2021-01-25 13:10:14.289218

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a98e2ae15892'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('users_OwnerId', sa.Integer(), nullable=True),
    sa.Column('latitude', sa.Integer(), nullable=True),
    sa.Column('longitude', sa.Integer(), nullable=True),
    sa.Column('venueType', sa.String(length=255), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('amenities', sa.String(), nullable=True),
    sa.Column('maxGuests', sa.Integer(), nullable=True),
    sa.Column('bookingPrice', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['users_OwnerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=True),
    sa.Column('locations_id', sa.Integer(), nullable=True),
    sa.Column('startDate', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['locations_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=True),
    sa.Column('locations_id', sa.Integer(), nullable=True),
    sa.Column('photoUrl', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['locations_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('locations_id', sa.Integer(), nullable=True),
    sa.Column('stars', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['locations_id'], ['locations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('firstName', sa.String(), nullable=True))
    op.add_column('users', sa.Column('lastName', sa.String(), nullable=True))
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(length=40),
               nullable=True)
    op.drop_constraint('users_email_key', 'users', type_='unique')
    op.drop_constraint('users_username_key', 'users', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('users_username_key', 'users', ['username'])
    op.create_unique_constraint('users_email_key', 'users', ['email'])
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(length=40),
               nullable=False)
    op.drop_column('users', 'lastName')
    op.drop_column('users', 'firstName')
    op.drop_table('reviews')
    op.drop_table('photos')
    op.drop_table('bookings')
    op.drop_table('locations')
    # ### end Alembic commands ###
