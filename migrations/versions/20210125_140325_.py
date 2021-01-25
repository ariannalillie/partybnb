"""empty message

Revision ID: 0b421355c455
Revises: 3464f3f0a26d
Create Date: 2021-01-25 14:03:25.969745

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b421355c455'
down_revision = '3464f3f0a26d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('locations', sa.Column('address', sa.String(), nullable=True))
    op.add_column('locations', sa.Column('city', sa.String(), nullable=True))
    op.add_column('locations', sa.Column('state', sa.String(), nullable=True))
    op.add_column('locations', sa.Column('zipcode', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('locations', 'zipcode')
    op.drop_column('locations', 'state')
    op.drop_column('locations', 'city')
    op.drop_column('locations', 'address')
    # ### end Alembic commands ###
