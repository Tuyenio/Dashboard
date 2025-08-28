-- Initial database schema for Analytics Dashboard
-- Version: V1
-- Description: Create initial tables for users, dashboards, metrics, and analytics events

-- Users table for authentication and authorization
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Create index on email and username for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- Dashboards table to store dashboard configurations
CREATE TABLE dashboards (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    owner_id BIGINT NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT false,
    configuration JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index on owner_id and name
CREATE INDEX idx_dashboards_owner_id ON dashboards(owner_id);
CREATE INDEX idx_dashboards_name ON dashboards(name);
CREATE INDEX idx_dashboards_public ON dashboards(is_public);

-- Metrics table to define different types of metrics
CREATE TABLE metrics (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    metric_type VARCHAR(50) NOT NULL, -- COUNT, SUM, AVG, MAX, MIN, etc.
    unit VARCHAR(20), -- requests, seconds, bytes, etc.
    category VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on name and category
CREATE UNIQUE INDEX idx_metrics_name ON metrics(name);
CREATE INDEX idx_metrics_category ON metrics(category);
CREATE INDEX idx_metrics_type ON metrics(metric_type);
CREATE INDEX idx_metrics_active ON metrics(is_active);

-- Analytics events table to store raw event data
CREATE TABLE analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- PAGE_VIEW, CLICK, CONVERSION, etc.
    user_id BIGINT,
    session_id VARCHAR(100),
    properties JSONB, -- Store additional event properties as JSON
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_url TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for analytics events (important for performance)
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);

-- Partitioning by month for better performance (optional, can be done later)
-- This creates a partitioned table for analytics_events by month
-- CREATE TABLE analytics_events_y2025m01 PARTITION OF analytics_events
--     FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Metric values table to store aggregated metric data
CREATE TABLE metric_values (
    id BIGSERIAL PRIMARY KEY,
    metric_id BIGINT NOT NULL,
    value DECIMAL(15,4) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    dimensions JSONB, -- Store dimensions like country, device_type, etc.
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (metric_id) REFERENCES metrics(id) ON DELETE CASCADE
);

-- Create indexes for metric values
CREATE INDEX idx_metric_values_metric_id ON metric_values(metric_id);
CREATE INDEX idx_metric_values_timestamp ON metric_values(timestamp);
CREATE INDEX idx_metric_values_metric_timestamp ON metric_values(metric_id, timestamp);

-- Dashboard widgets table to store widget configurations
CREATE TABLE dashboard_widgets (
    id BIGSERIAL PRIMARY KEY,
    dashboard_id BIGINT NOT NULL,
    widget_type VARCHAR(50) NOT NULL, -- CHART, TABLE, KPI, etc.
    title VARCHAR(100) NOT NULL,
    position_x INTEGER NOT NULL DEFAULT 0,
    position_y INTEGER NOT NULL DEFAULT 0,
    width INTEGER NOT NULL DEFAULT 1,
    height INTEGER NOT NULL DEFAULT 1,
    configuration JSONB, -- Widget-specific configuration
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE
);

-- Create index on dashboard_id
CREATE INDEX idx_dashboard_widgets_dashboard_id ON dashboard_widgets(dashboard_id);

-- User sessions table to track user sessions
CREATE TABLE user_sessions (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id BIGINT,
    ip_address INET,
    user_agent TEXT,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for user sessions
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX idx_user_sessions_started_at ON user_sessions(started_at);

-- Insert default admin user (password should be changed in production)
-- Default password: admin123 (hashed with BCrypt)
INSERT INTO users (username, email, password_hash, first_name, last_name, role)
VALUES (
    'admin',
    'admin@ics.com',
    '$2a$10$rWrFm8sB9v6QnwXWm0I9S.XL8HrXLrLqJ7qZa0w.6zP2w7M8Vh3iq',
    'Admin',
    'User',
    'ADMIN'
);

-- Insert some default metrics
INSERT INTO metrics (name, display_name, description, metric_type, unit, category) VALUES
('page_views', 'Page Views', 'Total number of page views', 'COUNT', 'views', 'Traffic'),
('unique_visitors', 'Unique Visitors', 'Number of unique visitors', 'COUNT', 'visitors', 'Traffic'),
('session_duration', 'Average Session Duration', 'Average time spent per session', 'AVG', 'seconds', 'Engagement'),
('bounce_rate', 'Bounce Rate', 'Percentage of single-page sessions', 'PERCENTAGE', 'percent', 'Engagement'),
('conversion_rate', 'Conversion Rate', 'Percentage of sessions that resulted in conversion', 'PERCENTAGE', 'percent', 'Conversion');

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboards_updated_at BEFORE UPDATE ON dashboards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metrics_updated_at BEFORE UPDATE ON metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_widgets_updated_at BEFORE UPDATE ON dashboard_widgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
