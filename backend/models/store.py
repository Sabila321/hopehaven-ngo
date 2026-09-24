"""
models/store.py - In-Memory Data Store
Single source of truth for all application data.
All data resets when the server restarts (no database by design).
Replace these dicts/lists with DB models when migrating to a real database.
"""
import copy

# ---------------------------------------------------------------------------
# SEED DATA - Programs (Humanitarian Causes)
# Mirrors src/data/programs.js from the frontend
# ---------------------------------------------------------------------------
_INITIAL_PROGRAMS = [
    {
        "id": "clean-water",
        "title": "Clean Drinking Water & Solar Wells",
        "category": "Clean Water",
        "summary": "Installing community solar-powered water filtration plants and deep tube wells in drought-prone rural villages.",
        "description": "Access to safe drinking water is a fundamental human right. In arid and flood-affected regions, families walk miles each day for contaminated water. Our initiative installs durable solar-powered filtration units and hand-pumps serving thousands of households.",
        "goal": 50000,
        "raised": 38500,
        "beneficiaries": "45,000+ Villagers",
        "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
        "featured": True,
        "urgency": "High"
    },
    {
        "id": "child-education",
        "title": "Child Education & School Kits Drive",
        "category": "Education",
        "summary": "Sponsoring underprivileged children with school supplies, uniforms, digital literacy labs, and trained teachers.",
        "description": "Education unlocks generational potential. We support community-based schools in slum clusters and remote valleys by equipping students with textbooks, uniforms, bags, daily nutrition, and interactive computer centers.",
        "goal": 35000,
        "raised": 29400,
        "beneficiaries": "3,200+ Students",
        "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
        "featured": True,
        "urgency": "Ongoing"
    },
    {
        "id": "mobile-healthcare",
        "title": "Mobile Healthcare Clinics & Medical Aid",
        "category": "Healthcare",
        "summary": "Deploying equipped medical vans with volunteer doctors to deliver free diagnosis, eye checkups, and life-saving medicines.",
        "description": "Rural and remote settlements often lack basic clinics within hours of travel. Our mobile healthcare units bring doctors, diagnostic equipment, free ultrasound/diabetes screening, and life-saving medications directly to their doorstep.",
        "goal": 60000,
        "raised": 47800,
        "beneficiaries": "28,000+ Patients",
        "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        "featured": True,
        "urgency": "High"
    },
    {
        "id": "emergency-relief",
        "title": "Emergency Flood & Disaster Relief",
        "category": "Disaster Relief",
        "summary": "Rapid response distribution of cooked meals, dry food ration packs, emergency shelter tents, and hygiene kits.",
        "description": "When natural disasters strike, quick deployment saves lives. Our disaster rescue teams deliver pre-packaged emergency food hampers, water purification tablets, warm blankets, and medical first-aid within 24 hours of crisis.",
        "goal": 80000,
        "raised": 71200,
        "beneficiaries": "52,000+ People",
        "image": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb2?auto=format&fit=crop&w=800&q=80",
        "featured": True,
        "urgency": "Critical"
    },
    {
        "id": "women-empowerment",
        "title": "Women Vocational Training & Micro-Grants",
        "category": "Livelihood",
        "summary": "Empowering widows and female breadwinners with certified sewing classes, digital freelancing skills, and startup toolkits.",
        "description": "Financial independence breaks poverty cycles. We provide women with industrial sewing machines, artisan craft training, financial literacy workshops, and small interest-free micro-grants to establish home-based sustainable businesses.",
        "goal": 40000,
        "raised": 31800,
        "beneficiaries": "1,800+ Women",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        "featured": False,
        "urgency": "Ongoing"
    },
    {
        "id": "orphan-sponsorship",
        "title": "Orphan Care & Warm Nutrition Support",
        "category": "Child Care",
        "summary": "Comprehensive monthly care covering nutritious hot meals, safe lodging, healthcare, and compassionate mentorship.",
        "description": "Ensuring that every parentless child receives the love, educational backing, mental healthcare, and wholesome nourishment required to flourish into a confident and independent adult.",
        "goal": 45000,
        "raised": 41000,
        "beneficiaries": "850+ Orphans",
        "image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
        "featured": False,
        "urgency": "Ongoing"
    },
]

# ---------------------------------------------------------------------------
# SEED DATA - Field Projects
# Mirrors src/data/projects.js from the frontend
# ---------------------------------------------------------------------------
_INITIAL_PROJECTS = [
    {
        "id": "solar-wells-thar",
        "title": "Thar Desert Solar Wells Project",
        "category": "Clean Water",
        "status": "Completed",
        "location": "Tharparkar & Umerkot Districts",
        "year": "2024",
        "impact": "32,000+ villagers now have continuous clean water from 45 deep solar wells.",
        "description": "Drilled 45 high-capacity deep borewells powered by photovoltaic arrays, featuring automated filtration and livestock troughs.",
        "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
        "featured": True
    },
    {
        "id": "slum-community-schools",
        "title": "Bright Horizons Slum Learning Centers",
        "category": "Education",
        "status": "In Progress",
        "location": "Karachi & Hyderabad Peri-Urban Belts",
        "year": "2024 - 2025",
        "impact": "1,450 children enrolled across 8 newly renovated learning spaces with solar power.",
        "description": "Transformed abandoned communal buildings into modern, child-friendly classrooms with digital smart boards, safe sanitation, and daily mid-day meals.",
        "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
        "featured": True
    },
    {
        "id": "flood-recovery-rebuild",
        "title": "Post-Flood Climate Resilient Housing",
        "category": "Disaster Relief",
        "status": "In Progress",
        "location": "Dadu & Khairpur",
        "year": "2024",
        "impact": "320 climate-resilient brick homes constructed for displaced flood survivors.",
        "description": "Constructing elevated, flood-resistant two-room masonry shelters equipped with solar lighting and attached sanitary latrines.",
        "image": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb2?auto=format&fit=crop&w=800&q=80",
        "featured": True
    },
    {
        "id": "eye-camps-rural",
        "title": "Vision For All: Cataract Surgery Mission",
        "category": "Healthcare",
        "status": "Completed",
        "location": "Badin & Mirpurkhas",
        "year": "2023 - 2024",
        "impact": "4,200 optical screenings, 1,180 successful lens replacement surgeries conducted free of charge.",
        "description": "Organized 12 surgical field camps where senior ophthalmic surgeons performed sutureless phaco cataract surgeries and dispensed prescription glasses.",
        "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        "featured": False
    },
    {
        "id": "women-artisan-guild",
        "title": "Artisan Women Micro-Enterprises",
        "category": "Livelihood",
        "status": "Completed",
        "location": "Larkana & Sukkur",
        "year": "2024",
        "impact": "480 women graduated with stitching diplomas, earning 2.5x their previous income.",
        "description": "Equipped local craftswomen with high-speed industrial stitching machinery and connected their handmade ethnic apparel to urban e-commerce markets.",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        "featured": False
    },
    {
        "id": "mobile-diagnostic-bus",
        "title": "Next-Gen Mobile Health Laboratory",
        "category": "Healthcare",
        "status": "Upcoming",
        "location": "Balochistan Highway Settlements",
        "year": "2025",
        "impact": "Projected to serve 20,000 remote patients per annum with telemetry and ultrasound.",
        "description": "Procuring and outfitting a 30-foot bus with complete diagnostic laboratory equipment, ultrasound scanners, satellite telemedicine, and refrigerated vaccine storage.",
        "image": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        "featured": False
    },
]

# ---------------------------------------------------------------------------
# SEED DATA - Testimonials
# ---------------------------------------------------------------------------
_INITIAL_TESTIMONIALS = [
    {
        "id": "test-1",
        "quote": "Before the solar water plant was built in our village, my daughters spent 4 hours every morning carrying clay pots of dirty river water. Today, clean drinking water is right outside our door, and my girls are attending school regularly.",
        "name": "Fatima Bibi",
        "role": "Mother & Beneficiary",
        "location": "Tharparkar District",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
        "rating": 5
    },
    {
        "id": "test-2",
        "quote": "Volunteering with HopeHaven opened my eyes to the power of grassroots compassion. In the medical camp, we treated elderly patients who had not seen a doctor in a decade. The team transparency and commitment is truly unmatched.",
        "name": "Dr. Tariq Rasheed",
        "role": "Volunteer Physician",
        "location": "Karachi Medical College",
        "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&h=200&q=80",
        "rating": 5
    },
    {
        "id": "test-3",
        "quote": "The vocational stitching course gave me independence after my husband passed away. With the sewing kit provided by the foundation, I now run a home tailoring shop that pays for my children's school books and nutrition.",
        "name": "Zahida Parveen",
        "role": "Tailoring Graduate & Entrepreneur",
        "location": "Hyderabad",
        "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80",
        "rating": 5
    },
    {
        "id": "test-4",
        "quote": "During the devastating monsoon floods, HopeHaven boats were the very first responders in our submerged neighborhood. They didn't just drop food; they stayed for weeks until our homes were dry and safe.",
        "name": "Ghulam Mustafa",
        "role": "Community Elder",
        "location": "Dadu Flood Relief Zone",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
        "rating": 5
    },
]

# ---------------------------------------------------------------------------
# SEED DATA - Site Settings
# ---------------------------------------------------------------------------
_INITIAL_SETTINGS = {
    "phone": "03233747970",
    "email": "sabilamemon7@gmail.com",
    "address": "Block 4, Clifton, Karachi, Pakistan",
    "organizationName": "HopeHaven Welfare Foundation",
    "heroBadge": "HopeHaven Welfare Foundation",
    "heroTitle": "Together We Bring Hope, Dignity & Opportunity",
    "heroSubtitle": "We are a dedicated non-profit organization striving to eliminate poverty, deliver clean drinking water, ensure quality education for every child, and provide rapid relief in times of crisis.",
    "stats": {
        "lives": "150,000+",
        "volunteers": "2,400+",
        "projects": "380+",
        "communities": "85+"
    }
}

# ---------------------------------------------------------------------------
# SEED DATA - Sample Contact Messages
# ---------------------------------------------------------------------------
_INITIAL_CONTACT_MESSAGES = [
    {
        "id": "msg-1",
        "name": "Ahmed Bilal",
        "email": "ahmed.bilal@example.com",
        "phone": "03001234567",
        "subject": "Solar Water Well Sponsorship in Thar",
        "message": "Hello, our family foundation would like to sponsor a complete solar water filtration well in Tharparkar. Please provide project timeline and budget details.",
        "date": "2026-09-18 10:30 AM",
        "read": True
    },
    {
        "id": "msg-2",
        "name": "Zainab Qureshi",
        "email": "zainab.q@example.com",
        "phone": "03339876543",
        "subject": "School Uniforms Donation Drive",
        "message": "We have 200 high-quality stitched uniforms to donate for your slum education centers. How can we arrange delivery to your Karachi warehouse?",
        "date": "2026-09-20 03:15 PM",
        "read": False
    },
]

# ---------------------------------------------------------------------------
# SEED DATA - Sample Volunteer Applications
# ---------------------------------------------------------------------------
_INITIAL_VOLUNTEER_APPLICATIONS = [
    {
        "id": "app-1",
        "fullName": "Dr. Hamza Siddiqui",
        "email": "dr.hamza@example.com",
        "phone": "03214567890",
        "areaOfInterest": "Healthcare & Medical Camps",
        "availability": "Weekends Only",
        "message": "General practitioner with 4 years of clinical experience. Eager to volunteer for Sunday eye and free medical checkup camps.",
        "date": "2026-09-19 11:45 AM",
        "status": "Reviewed"
    },
    {
        "id": "app-2",
        "fullName": "Mariam Farooq",
        "email": "mariam.f@example.com",
        "phone": "03451122334",
        "areaOfInterest": "Child Teaching & Slum Schools",
        "availability": "Weekdays (Part-time)",
        "message": "Recent graduate in Early Childhood Education. Passionate about teaching literacy and basic mathematics to out-of-school children.",
        "date": "2026-09-21 09:20 AM",
        "status": "Pending"
    },
]

# ---------------------------------------------------------------------------
# LIVE IN-MEMORY STORE
# These are the actual mutable data structures used at runtime.
# Deep-copy from seed so we always start fresh on server restart.
# ---------------------------------------------------------------------------
programs = copy.deepcopy(_INITIAL_PROGRAMS)
projects = copy.deepcopy(_INITIAL_PROJECTS)
testimonials = copy.deepcopy(_INITIAL_TESTIMONIALS)
settings = copy.deepcopy(_INITIAL_SETTINGS)
contact_messages = copy.deepcopy(_INITIAL_CONTACT_MESSAGES)
volunteer_applications = copy.deepcopy(_INITIAL_VOLUNTEER_APPLICATIONS)
donations = []   # Populated by form submissions during runtime


def reset_to_defaults():
    """Reset all in-memory data back to initial seed values."""
    global programs, projects, testimonials, settings, contact_messages, volunteer_applications, donations
    programs = copy.deepcopy(_INITIAL_PROGRAMS)
    projects = copy.deepcopy(_INITIAL_PROJECTS)
    testimonials = copy.deepcopy(_INITIAL_TESTIMONIALS)
    settings = copy.deepcopy(_INITIAL_SETTINGS)
    contact_messages = copy.deepcopy(_INITIAL_CONTACT_MESSAGES)
    volunteer_applications = copy.deepcopy(_INITIAL_VOLUNTEER_APPLICATIONS)
    donations = []


def export_state():
    """Return the complete mutable application state for database persistence."""
    return {
        'programs': programs,
        'projects': projects,
        'testimonials': testimonials,
        'settings': settings,
        'contact_messages': contact_messages,
        'volunteer_applications': volunteer_applications,
        'donations': donations,
    }


def load_state(state):
    """Replace in-memory collections with a state restored from the database."""
    global programs, projects, testimonials, settings, contact_messages, volunteer_applications, donations
    programs = state.get('programs', programs)
    projects = state.get('projects', projects)
    testimonials = state.get('testimonials', testimonials)
    settings = state.get('settings', settings)
    contact_messages = state.get('contact_messages', contact_messages)
    volunteer_applications = state.get('volunteer_applications', volunteer_applications)
    donations = state.get('donations', donations)
