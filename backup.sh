#!/bin/bash

# Set backup directory
BACKUP_DIR="/var/backups/himalayanvidyadaan"
mkdir -p $BACKUP_DIR

# Get current date
DATE=$(date +%Y%m%d)

# Database backup
pg_dump himalayanvidyadaan_db > $BACKUP_DIR/db_backup_$DATE.sql

# Media files backup
tar -czf $BACKUP_DIR/media_backup_$DATE.tar.gz /var/www/himalayanvidyadaan.org/backend/media/

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete

# Log backup completion
echo "Backup completed on $(date)" >> $BACKUP_DIR/backup.log 