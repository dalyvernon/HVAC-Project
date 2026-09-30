import { ServiceItem, ReviewItem, MaintenancePlan, CaseStudy } from '../types';

export const BUSINESS_INFO = {
  name: 'HVAC Express Contracting LLC',
  legalName: 'HVAC Express Contracting LLC',
  phone: '(512) 967-1088',
  phoneRaw: '5129671088',
  email: 'service@hvacexpresstx.com',
  address: '13900 N IH 35 Suite H1',
  city: 'Austin',
  state: 'TX',
  zip: '78728',
  fullAddress: '13900 N IH 35 Suite H1, Austin, TX 78728',
  license: 'TDLR TACLA #84921E',
  hours: 'Mon-Sun: 24/7 Emergency Service | Office: 7:00 AM - 8:00 PM',
  serviceRadius: '35 Miles throughout Greater Austin & Travis / Williamson Counties',
  primaryCommunities: [
    'North Austin',
    'Round Rock',
    'Pflugerville',
    'Wells Branch',
    'Cedar Park',
    'Georgetown',
    'Mueller',
    'The Domain',
    'Downtown Austin',
    'Hutto',
    'Brushy Creek'
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ac-repair',
    slug: 'ac-repair',
    title: 'Emergency AC Repair & Diagnostics',
    category: 'cooling',
    shortDesc: 'Rapid 24/7 diagnostic dispatch for central air systems that are blowing warm air, freezing over, or failing to cycle during Austin heatwaves.',
    fullDesc: 'When summer temperatures in Austin surge past 100°F, an air conditioner failure is more than an inconvenience—it is a safety emergency. Our NATE-certified technicians carry fully stocked service vans equipped with universal capacitors, contactors, fan motors, hard-start kits, and EPA-approved refrigerants. We conduct digital static pressure testing and thermal imaging to isolate the root mechanical or electrical failure immediately.',
    priceStartingAt: '$89 Comprehensive Diagnostic Fee',
    turnaroundTime: 'Under 2-Hour Rapid Emergency Window',
    warranty: '1-Year Parts & Labor Warranty on All Repairs',
    keyFeatures: [
      'Digital electronic leak detection (Freon / R-410A / R-454B)',
      'Dual-capacitor, contactor & relay testing and replacement',
      'Compressor amp draw and thermal overload assessment',
      'Blower wheel balance & ECM motor diagnosis',
      'Frozen evaporator coil defrosting & refrigerant trim',
      'Condensate drain line clearing & float switch safety audits'
    ],
    benefits: [
      'Upfront flat-rate pricing before any wrench turns',
      'No after-hours emergency surcharge for VIP members',
      'Same-day restoration rate of over 94% on first visit',
      'Licensed Texas Department of Licensing & Regulation (TDLR) technicians'
    ],
    specs: [
      { label: 'Diagnostic Method', value: 'Fieldpiece Digital Manifold & Thermal Laser' },
      { label: 'Refrigerants Serviced', value: 'R-410A, R-454B, R-32, R-22 retrofit' },
      { label: 'Dispatch Coverage', value: 'Austin, Round Rock, Pflugerville, Cedar Park' },
      { label: 'Availability', value: '24 Hours / 7 Days a Week' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Immediate Triage & Dispatch',
        description: 'Our Austin dispatch desk confirms your symptoms and notifies the nearest neighborhood technician with a live GPS arrival alert.'
      },
      {
        step: '02',
        title: '32-Point Electrical & Refrigerant Audit',
        description: 'We test subcooling, superheat, delta T temperature drop across the coil, and electrical draw on all motors.'
      },
      {
        step: '03',
        title: 'Firm Transparent Written Quote',
        description: 'We present the exact repair options with transparent, fixed pricing before any work begins. No hidden add-ons.'
      },
      {
        step: '04',
        title: 'Precision Repair & System Verification',
        description: 'Once repaired, we run a full 15-minute load cycle to verify stable pressures, cool airflow, and proper electrical cycling.'
      }
    ],
    faqs: [
      {
        question: 'Why is my air conditioner running continuously but the house temperature is rising?',
        answer: 'This is commonly caused by low refrigerant levels due to a pinhole coil leak, a failing dual-run capacitor causing the outdoor compressor to stall, or severely restricted airflow from a clogged filter or frosted evaporator coil. Turn the thermostat to OFF to prevent compressor burnout and call us immediately at (512) 967-1088.'
      },
      {
        question: 'Do you charge extra for weekend or nighttime emergency calls?',
        answer: 'We provide upfront transparent pricing. Diagnostic rates are clearly stated before dispatch, and our VIP Express Care maintenance club members enjoy zero overtime fees 365 days a year.'
      },
      {
        question: 'Can you repair older AC systems using R-22 refrigerant?',
        answer: 'Yes. While R-22 is phased out from manufacturing, we can diagnose older systems, perform mechanical electrical repairs, or evaluate safe conversion options and high-efficiency replacement pathways.'
      },
      {
        question: 'What does it mean when ice forms on the brass lines outside?',
        answer: 'Ice indicates severe temperature drop below freezing inside your indoor evaporator coil. This occurs when airflow is blocked or refrigerant pressure is insufficient. Shut down the AC immediately so the ice melts without warping the drain pan.'
      }
    ]
  },
  {
    id: 'ac-installation',
    slug: 'ac-installation',
    title: 'High-Efficiency AC & Heat Pump Replacement',
    category: 'cooling',
    shortDesc: 'Engineered central HVAC and inverter heat pump installations tailored to Central Texas climate with SEER2 ratings up to 22+.',
    fullDesc: 'Replacing an aging air conditioner or heat pump is one of the highest-return investments in your Austin home. We do not just swap boxes: our certified Comfort Advisors calculate an ACCA Manual J load calculation to size your system precisely for your home’s solar orientation, window glazing, insulation, and square footage. We help homeowners capture up to $2,000+ in Austin Energy rebates and federal Energy Efficient Home Improvement Tax Credits.',
    priceStartingAt: 'Starting at $5,800 Installed (Financing from $89/mo)',
    turnaroundTime: '1-Day Complete Turnkey Replacement',
    warranty: '10-Year Manufacturer Equipment Warranty + 2-Year Workmanship Guarantee',
    keyFeatures: [
      'Certified ACCA Manual J heat gain calculation for exact sizing',
      'Inverter-driven variable-speed compressor technology for continuous humidity control',
      'Quiet-operating outdoor fans (<55 dB whisper operation)',
      'Austin Energy & PEC utility rebate program submission assistance',
      'Complete safety secondary drain pan with emergency float shutoff switches',
      'Digital programmable or smart WiFi thermostat integration'
    ],
    benefits: [
      'Reduces summer electric cooling bills by up to 35% - 48%',
      'Exceptional humidity removal during muggy Central Texas spring storms',
      '0% APR financing options available for qualified homeowners',
      'City of Austin mechanical permits pulled and final inspections passed'
    ],
    specs: [
      { label: 'Efficiency Range', value: '14.3 SEER2 up to 22.5 SEER2' },
      { label: 'Technology', value: 'Single-Stage, Two-Stage & Inverter Variable-Speed' },
      { label: 'Brands Partnered', value: 'Carrier, Trane, Lennox, Daikin, Goodman' },
      { label: 'Incentives', value: 'Austin Energy Rebate + Federal 25C Tax Credit' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'In-Home Engineering & Manual J Analysis',
        description: 'We measure cubic footage, insulation levels, window exposure, and static duct pressure rather than guessing tonnages.'
      },
      {
        step: '02',
        title: 'Good / Better / Best System Architecture',
        description: 'You receive clear transparent options comparing upfront investment, monthly utility savings, and sound ratings.'
      },
      {
        step: '03',
        title: 'White-Glove Installation Day',
        description: 'Drop cloths from the front door to the attic, new equipment pads, vibration isolators, and pristine brazing with nitrogen purge.'
      },
      {
        step: '04',
        title: 'Commissioning & Quality Audit',
        description: 'We measure true CFM airflow, superheat/subcooling charging by weight, and walk you through thermostat controls.'
      }
    ],
    faqs: [
      {
        question: 'What size AC system do I need for my Austin home?',
        answer: 'Rules of thumb like "500 sq ft per ton" fail in Texas due to vaulted ceilings, window heat gain, and attic radiant heat. We perform an ACCA Manual J load calculation to ensure your unit is neither undersized (runs non-stop) nor oversized (short-cycles, leaving sticky indoor humidity).'
      },
      {
        question: 'Are inverter heat pumps good for Austin winters and summers?',
        answer: 'Modern inverter heat pumps are ideal for Austin. They deliver ultra-efficient cooling up to 110°F outside while providing gentle, cost-effective heating during winter cold fronts without expensive electric resistance heat strips.'
      },
      {
        question: 'How do Austin Energy rebates work?',
        answer: 'As an approved participating contractor, HVAC Express handles the paperwork, test-in, and test-out compliance for Austin Energy and local utility rebates, deducting available rebates or assisting with direct customer rebate payouts.'
      },
      {
        question: 'How long does a new AC installation take?',
        answer: 'Standard residential split systems are replaced within one working day (typically 6 to 8 hours), restoring your cooling before evening.'
      }
    ]
  },
  {
    id: 'heating-furnace',
    slug: 'heating-furnace',
    title: 'Furnace Repair, Heating & Heat Pump Services',
    category: 'heating',
    shortDesc: 'Certified gas furnace, electric air handler, and dual-fuel heat pump service to keep your family safe and warm during Texas freezes.',
    fullDesc: 'When winter Arctic blasts push temperatures below freezing in Central Texas, reliable heating is critical. Our technicians inspect and service gas burners, hot surface igniters, flame sensors, heat exchangers, and electric emergency heat strips. We perform carbon monoxide combustion safety tests on every gas heating service to safeguard your family against invisible toxic leaks.',
    priceStartingAt: '$89 Heating System Safety Audit',
    turnaroundTime: 'Same-Day Service Guaranteed',
    warranty: '100% Satisfaction Guarantee & 1-Year Labor Warranty',
    keyFeatures: [
      'Digital electronic carbon monoxide (CO) emission inspection',
      'Cracked heat exchanger optical boroscope inspection',
      'Gas valve pressure regulation & manifold calibration',
      'Flame sensor cleaning and electronic igniter replacement',
      'Electric auxiliary heat strip sequencer diagnosis',
      'High-limit safety switch testing & flue ventilation draft audit'
    ],
    benefits: [
      'Prevents dangerous carbon monoxide hazards in living areas',
      'Guarantees instant heat during rapid winter temperature drops',
      'Eliminates burning odors and high winter utility surges',
      'Ensures compliance with Texas gas mechanical codes'
    ],
    specs: [
      { label: 'Systems Covered', value: 'Natural Gas, Propane Furnaces, Heat Pumps, Electric Air Handlers' },
      { label: 'Safety Standard', value: 'Electronic Carbon Monoxide Sensor Calibration' },
      { label: 'Ignition Types', value: 'Silicon Nitride, Direct Spark, Standing Pilot' },
      { label: 'AFUE Ratings', value: 'Up to 98% Ultra-High Efficiency Gas Furnaces' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Safety Interlock & Gas Supply Check',
        description: 'We test gas shutoffs, electrical breakers, and safety door switches before initiating test cycles.'
      },
      {
        step: '02',
        title: 'Combustion Chamber & Heat Exchanger Scan',
        description: 'Using specialized micro-cameras, we inspect combustion chambers for hairline cracks or corrosion.'
      },
      {
        step: '03',
        title: 'Burner Calibration & Draft Verification',
        description: 'We verify blue flame stability, draft inducer motor pull, and clear flue venting.'
      },
      {
        step: '04',
        title: 'Static Airflow & Temp Rise Verification',
        description: 'We balance temperature rise against manufacturer design plates to prevent premature heat exchanger stress.'
      }
    ],
    faqs: [
      {
        question: 'Why does my heater smell like something is burning when first turned on?',
        answer: 'When a heating system sits unused throughout Austin’s long summer, dust settles on the electric coils or gas heat exchanger. During the initial cycle, this harmless dust burns off within 20–30 minutes. If the odor smells like electrical plastic or persists longer, shut it off and call us for an inspection.'
      },
      {
        question: 'How do I know if my furnace heat exchanger is cracked?',
        answer: 'Warning signs include yellow flickering flames instead of crisp blue flames, soot deposits inside the cabinet, strange odors, or your carbon monoxide alarm triggering. A cracked heat exchanger can leak carbon monoxide into your ductwork and requires immediate shutdown.'
      },
      {
        question: 'What is emergency heat on my thermostat?',
        answer: 'Emergency heat activates backup electric resistance heat strips if your primary outdoor heat pump malfunctions or is locked in defrost mode during freezing weather. Because resistance heat consumes significant electricity, emergency heat should only be used temporarily while our technician is en route.'
      }
    ]
  },
  {
    id: 'maintenance-tuneup',
    slug: 'maintenance-tuneup',
    title: '21-Point Precision Tune-Up & VIP Express Care',
    category: 'maintenance',
    shortDesc: 'Comprehensive preventative maintenance that prevents 85% of unexpected summer breakdowns and maintains factory warranties.',
    fullDesc: 'Extreme heat strains mechanical components, degrades lubrication, and builds resistive heat in electrical terminals. Our 21-Point Precision Tune-Up cleans coils, flushes condensate lines, tightens electrical lugs, measures capacitor capacitance against microfarad tolerances, and fine-tunes refrigerant charge to factory specifications. Proactive care extends HVAC lifespan from 10 to 15+ years.',
    priceStartingAt: '$79 Seasonal Special / $14.99/mo Club',
    turnaroundTime: '60-75 Minute Thorough Appointment',
    warranty: 'No-Breakdown Guarantee for 90 Days Post-Tune-Up',
    keyFeatures: [
      'Outdoor condenser coil chemical foam wash & fin straightening',
      'Microfarad rating verification on starting and running capacitors',
      'Refrigerant operating pressure & temperature split audit',
      'Blower assembly inspection and static amp draw verification',
      'Condensate drain line vacuum flush & anti-algae tablet treatment',
      'Thermostat calibration and safety disconnect switch testing'
    ],
    benefits: [
      'Maintains equipment manufacturer warranty compliance',
      'Lowers monthly power bills by restoring factory heat transfer efficiency',
      'Detects failing parts weeks before total catastrophic system failure',
      'Priority scheduling during peak summer and winter rush periods'
    ],
    specs: [
      { label: 'Inspection Points', value: '21 Certified Mechanical & Electrical Checks' },
      { label: 'Recommended Frequency', value: 'Twice Annually (Spring AC & Autumn Heating)' },
      { label: 'Average Lifespan Gain', value: '+4 to 7 Years with Consistent Maintenance' },
      { label: 'Club Benefits', value: '15% Off All Repairs & Priority Dispatch' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Arrival & System Baseline Test',
        description: 'Our technician records starting thermostat temperatures, system cycling behavior, and operating sound levels.'
      },
      {
        step: '02',
        title: 'Deep Mechanical & Coil Cleaning',
        description: 'We wash outdoor coils to remove Texas pollen, dust, and grass clippings that choke heat dissipation.'
      },
      {
        step: '03',
        title: 'Electrical Tolerances & Motor Audit',
        description: 'We check contactor points for pitting, test capacitors, and torque all high-voltage connections.'
      },
      {
        step: '04',
        title: 'Detailed Digital Health Report',
        description: 'You receive an easy-to-read report card with photos, component readings, and honest recommendations.'
      }
    ],
    faqs: [
      {
        question: 'How often should HVAC maintenance be performed in Austin?',
        answer: 'In Central Texas, systems run hard 9 to 10 months out of the year. Industry standards require two visits annually: a cooling tune-up in spring (March-May) and a heating safety check in fall (October-December).'
      },
      {
        question: 'Does skipping maintenance void my manufacturer warranty?',
        answer: 'Yes. Major manufacturers like Carrier, Trane, and Lennox require documented proof of regular annual professional maintenance to honor multi-year compressor and parts warranties.'
      },
      {
        question: 'What is included in the VIP Express Care club?',
        answer: 'Members receive two comprehensive 21-point visits per year, guaranteed priority scheduling during emergencies, 15% discount on all repairs, and zero overtime charges.'
      }
    ]
  },
  {
    id: 'indoor-air-quality',
    slug: 'indoor-air-quality',
    title: 'Indoor Air Quality, Filtration & Duct Solutions',
    category: 'air-quality',
    shortDesc: 'Eliminate Cedar fever allergens, pet dander, mold spores, and attic air leaks with whole-home filtration and sealed ductwork.',
    fullDesc: 'Austin is legendary for its severe allergy seasons, including winter Mountain Cedar, spring Oak pollen, and humid summer mold blooms. Standard 1-inch fiberglass filters only protect mechanical equipment, allowing micro-allergens to recirculate continuously. We install whole-home MERV 13-16 media filters, germicidal UV-C coil purifiers, plasma scrubbers, and balance ductwork to ensure fresh, odorless, medical-grade clean air in every room.',
    priceStartingAt: '$149 Whole-Home IAQ Assessment',
    turnaroundTime: '2-4 Hour Professional Installation',
    warranty: '5-Year Equipment Warranty on Purification Units',
    keyFeatures: [
      'Whole-home hospital-grade MERV 13 to MERV 16 filtration cabinets',
      'Germicidal UV-C lights to sterilize wet evaporator coils and stop mold',
      'Bipolar ionization scrubbers neutralizing VOCs and airborne viruses',
      'Whole-home dehumidification systems engineered for Texas summers',
      'Aero-dynamic duct sealing to eliminate attic insulation infiltration',
      'Supply and return air register balancing for uniform room comfort'
    ],
    benefits: [
      'Tremendous relief from Austin cedar fever and seasonal allergies',
      'Stops musty odors and biological growth in dark HVAC crawlspaces',
      'Protects expensive evaporator coils from sticky dust buildup',
      'Maintains ideal 45-50% relative humidity even on humid rainy days'
    ],
    specs: [
      { label: 'Filtration Efficiency', value: 'Captures 98% of particles down to 0.3 microns' },
      { label: 'Technology Options', value: 'UV-C, Active Bi-Polar Ionization, Carbon Filters' },
      { label: 'Dehumidifier Capacity', value: '70 to 130 Pints / Day Whole-Home Integration' },
      { label: 'Airflow Optimization', value: 'Static Pressure Balancing & Leak Detection' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Laser Particle & Humidity Audit',
        description: 'We test PM2.5 particle counts, volatile organic compounds, and relative humidity throughout your home.'
      },
      {
        step: '02',
        title: 'Custom Clean-Air Engineering',
        description: 'We design a non-restrictive air purification solution that cleans the air without starving your blower motor.'
      },
      {
        step: '03',
        title: 'Seamless In-Duct Integration',
        description: 'Installed cleanly inside your existing return plenum with magnetic access doors for easy filter swaps.'
      },
      {
        step: '04',
        title: 'Airflow & Pressure Verification',
        description: 'We verify static pressure remains within safe manufacturer boundaries for optimal equipment life.'
      }
    ],
    faqs: [
      {
        question: 'Will a better filter help with Austin Cedar Fever?',
        answer: 'Yes! Cedar pollen grains are between 20 to 30 microns in size. A whole-home MERV 13 or 16 media filter captures over 95% of pollen, pet dander, and dust mite particles before they reach your living spaces.'
      },
      {
        question: 'Can I just buy a cheap high-MERV 1-inch filter from the grocery store?',
        answer: 'Caution: Dense 1-inch filters restrict airflow like a brick wall, causing evaporator coils to freeze and compressors to overheat. Whole-home media cabinets are 4 to 5 inches thick, providing massive surface area so air flows freely while trapping microscopic particles.'
      },
      {
        question: 'How do UV-C germicidal lights work inside an AC system?',
        answer: 'Your indoor evaporator coil is dark and constantly damp from condensation, making it a breeding ground for mold and bacteria. UV-C lights continuously bathe the coil in ultraviolet light, destroying microbial DNA and preventing organic buildup.'
      }
    ]
  },
  {
    id: 'commercial-hvac',
    slug: 'commercial-hvac',
    title: 'Commercial HVAC & Rooftop Contracting',
    category: 'commercial',
    shortDesc: 'Reliable rooftop package units (RTU), split commercial systems, and customized maintenance agreements for Austin businesses.',
    fullDesc: 'From technology office suites in North Austin to retail storefronts at The Domain and restaurants in Travis County, unexpected heating or cooling outages disrupt customers, damage inventory, and harm staff productivity. HVAC Express Contracting LLC provides commercial rooftop unit crane replacements, economizer servicing, zone damper automation, and proactive multi-site maintenance agreements.',
    priceStartingAt: 'Custom Commercial Estimates & Service Plans',
    turnaroundTime: 'Guaranteed Priority Business SLA Response',
    warranty: 'Comprehensive Commercial Labor & Equipment Backing',
    keyFeatures: [
      'Commercial rooftop unit (RTU) crane rigging and turnkey replacement',
      'Variable Refrigerant Flow (VRF) and multi-zone climate control',
      'Fresh-air economizer calibration to meet Texas building codes',
      'Commercial ductwork design, smoke damper testing, and ventilation',
      'Quarterly commercial preventative maintenance agreements',
      'Emergency commercial chiller, condenser, and heat pump repairs'
    ],
    benefits: [
      'Protects business uptime and client comfort with rapid SLA response',
      'Lowers commercial electrical peak-demand utility penalties',
      'Comprehensive digital invoicing, asset tagging, and maintenance history',
      'Direct account manager and dedicated certified commercial lead tech'
    ],
    specs: [
      { label: 'Equipment Capacities', value: '3 Tons to 25+ Ton Rooftop Package Units' },
      { label: 'Control Systems', value: 'BACnet, Modbus, Commercial Smart Thermostats' },
      { label: 'Client Types', value: 'Retail, Offices, Clinics, Restaurants, Warehouses' },
      { label: 'Safety & Permitting', value: 'Fully Bonded, Insured, OSHA Compliant' }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Facility Audit & Equipment Tagging',
        description: 'We survey your rooftop units, make/model serials, belt sizes, and electrical load feeds.'
      },
      {
        step: '02',
        title: 'Customized Preventative SLA Plan',
        description: 'Quarterly filter changes, belt tensioning, electrical torque checks, and coil cleanings scheduled around your business hours.'
      },
      {
        step: '03',
        title: 'Priority Commercial Dispatch',
        description: 'If a commercial unit goes down, your account receives dedicated dispatch ahead of residential queues.'
      },
      {
        step: '04',
        title: 'Transparent Facility Reporting',
        description: 'Detailed mechanical reports with photos and repair logs for your property management records.'
      }
    ],
    faqs: [
      {
        question: 'Do you offer emergency weekend service for restaurants and retail shops?',
        answer: 'Yes. Commercial clients with maintenance agreements have dedicated 24/7 emergency dispatch with rapid 2-hour arrival windows to minimize downtime.'
      },
      {
        question: 'Can you handle crane permits and street closures for rooftop replacements?',
        answer: 'Absolutely. We manage Austin mechanical permits, FAA crane notifications, street closure logistics, and EPA refrigerant recovery compliance from start to finish.'
      },
      {
        question: 'What types of commercial facilities do you service?',
        answer: 'We service commercial properties across Austin including medical offices, restaurants, fitness clubs, retail strip centers, technology campuses, and light industrial facilities.'
      }
    ]
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    neighborhood: 'Wells Branch',
    city: 'Austin, TX',
    serviceType: 'Emergency AC Repair',
    rating: 5,
    date: 'August 14, 2026',
    quote: 'Our AC stopped blowing cold on a Saturday afternoon when it was 104° outside. HVAC Express had a technician at our door in 45 minutes. He tested the capacitor, showed me the exact reading on his meter, and had cold air pumping 20 minutes later. Honest, fair pricing, and no pressure.',
    verified: true,
    platform: 'Google',
    systemModel: 'Trane XR14 Central Air',
    helpfulCount: 28
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    neighborhood: 'Avery Ranch',
    city: 'Austin, TX',
    serviceType: 'High-Efficiency Heat Pump Replacement',
    rating: 5,
    date: 'July 28, 2026',
    quote: 'Replaced our 16-year-old builder unit with an 18 SEER2 inverter system. The crew covered our stairs, finished by 4 PM, and helped us claim our $1,200 Austin Energy rebate. Our July electric bill was $115 lower than last year!',
    verified: true,
    platform: 'Nextdoor',
    systemModel: 'Carrier Infinity 19VS Inverter',
    helpfulCount: 34
  },
  {
    id: 'rev-3',
    author: 'David Chen',
    neighborhood: 'Mueller',
    city: 'Austin, TX',
    serviceType: 'Indoor Air Quality & UV Scrubber',
    rating: 5,
    date: 'June 09, 2026',
    quote: 'Cedar fever in Austin used to make my winters miserable. HVAC Express installed a whole-home filtration cabinet and UV coil system. The dust in the house dropped significantly and my allergies are finally under control.',
    verified: true,
    platform: 'Google',
    systemModel: 'REME HALO & MERV 16 Cabinet',
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    author: 'Sarah Jenkins',
    neighborhood: 'Round Rock',
    city: 'Round Rock, TX',
    serviceType: 'Furnace Inspection & Heat Safety',
    rating: 5,
    date: 'January 18, 2026',
    quote: 'Before the January freeze, they came out for a heating tune-up. They caught a hairline flame sensor issue that would have caused our furnace to lock out in freezing temps. Reliable, courteous, and professional.',
    verified: true,
    platform: 'Google',
    systemModel: 'Lennox High-Efficiency Gas Furnace',
    helpfulCount: 22
  },
  {
    id: 'rev-5',
    author: 'Dr. Brian Holloway',
    neighborhood: 'The Domain / North Austin',
    city: 'Austin, TX',
    serviceType: 'Commercial RTU Emergency Service',
    rating: 5,
    date: 'August 03, 2026',
    quote: 'Our medical clinic had a rooftop package unit go down on Monday morning. HVAC Express had a crane lift and replacement compressor organized in hours with zero disruption to patient appointments. Best commercial HVAC team in Travis County.',
    verified: true,
    platform: 'Google',
    systemModel: '10-Ton Daikin Commercial RTU',
    helpfulCount: 41
  },
  {
    id: 'rev-6',
    author: 'Teresa & James Morales',
    neighborhood: 'Pflugerville',
    city: 'Pflugerville, TX',
    serviceType: '21-Point Tune-Up & Float Switch Upgrade',
    rating: 5,
    date: 'May 22, 2026',
    quote: 'Signed up for the Gold VIP Express Club. The tech did an incredibly thorough inspection, vacuumed our drain line, and installed a dual secondary float switch that saved our ceiling when the primary line backed up. True professionals.',
    verified: true,
    platform: 'Nextdoor',
    systemModel: 'Goodman Dual Split System',
    helpfulCount: 17
  },
  {
    id: 'rev-7',
    author: 'Kevin Lindqvist',
    neighborhood: 'Cedar Park',
    city: 'Cedar Park, TX',
    serviceType: 'Ductless Mini-Split Installation',
    rating: 5,
    date: 'September 02, 2026',
    quote: 'Added a garage workshop and needed independent cooling. HVAC Express engineered a multi-zone inverter that keeps the space at an icy 72° even at 3 PM in August. Clean copper line hide and whisper-quiet operation.',
    verified: true,
    platform: 'Google',
    systemModel: 'Mitsubishi Hyper-Heating Mini-Split',
    helpfulCount: 15
  },
  {
    id: 'rev-8',
    author: 'Rachel Sterling',
    neighborhood: 'Brushy Creek',
    city: 'Austin, TX',
    serviceType: 'Dual-Run Capacitor & Coil Wash',
    rating: 5,
    date: 'June 30, 2026',
    quote: 'Another company quoted $1,800 claiming our compressor was shot. Called HVAC Express for a second opinion. Their tech found a swollen 45/5 MFD capacitor, swapped it in 15 minutes for under $200, and our AC has run flawlessly since. They earned a customer for life.',
    verified: true,
    platform: 'Google',
    systemModel: 'American Standard Heritage 14',
    helpfulCount: 52
  }
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'essential',
    name: 'Silver Seasonal Plan',
    priceMonthly: 14.99,
    priceAnnual: 159,
    description: 'Essential twice-annual preventative maintenance to protect warranties and prevent summer breakdowns.',
    features: [
      '2 Comprehensive 21-point visits per year (Spring AC & Autumn Heating)',
      '10% Discount on all mechanical repairs and parts',
      'Outdoor condenser chemical coil flush included',
      'Condensate drain line vacuum clean & treatment',
      'Written digital system health report'
    ],
    discounts: '10% Off Repairs'
  },
  {
    id: 'express-vip',
    name: 'Gold VIP Express Club',
    popular: true,
    priceMonthly: 24.99,
    priceAnnual: 269,
    description: 'Our most popular comprehensive coverage plan with front-of-the-line emergency dispatch and zero overtime fees.',
    features: [
      '2 Comprehensive 21-point visits per year',
      '15% Discount on all repairs and diagnostic fees',
      'Guaranteed 24-hour priority dispatch during heatwaves',
      'Zero overtime or weekend surcharge fees forever',
      'Annual replacement of standard 1-inch or 4-inch filters',
      'Electrical capacitor & contactor wear monitoring',
      'Transferrable to new homeowner if you sell your Austin property'
    ],
    discounts: '15% Off Repairs + Zero Overtime'
  },
  {
    id: 'commercial-pro',
    name: 'Platinum Facility Care',
    priceMonthly: 49.99,
    priceAnnual: 549,
    description: 'Designed for commercial properties, high-demand multi-zone residences, and luxury smart homes.',
    features: [
      '4 Quarterly visits per year for maximum reliability',
      '20% Discount on all repairs and new equipment upgrades',
      'Same-day guaranteed priority dispatch SLA',
      'Zero overtime, weekend, or holiday dispatch fees',
      'Biannual duct airflow balance & static pressure check',
      'Dedicated lead technician assigned to your property',
      'Comprehensive asset tracking and equipment lifecycle logs'
    ],
    discounts: '20% Off Repairs + Guaranteed 4-Hour SLA'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Two-Story Residence AC Overhaul',
    location: 'North Austin (Wells Branch)',
    challenge: 'Upstairs bedroom stayed at 81°F during 100°F afternoons while the ground floor was freezing at 70°F due to improper duct sizing and an undersized single-stage condenser.',
    solution: 'Engineered a dual-zone variable-capacity inverter heat pump with automated modulating dampers and return air balance.',
    results: [
      { metric: '72°F Uniform', label: 'Consistent upstairs & downstairs comfort' },
      { metric: '-38%', label: 'Summer electric bill reduction' },
      { metric: '$1,850', label: 'Captured utility and federal tax incentives' }
    ],
    systemType: 'Carrier 18.5 SEER2 Variable Speed Inverter'
  },
  {
    id: 'case-2',
    title: 'Emergency Commercial RTU Replacement',
    location: 'Austin Tech Corridor (IH-35 & Parmer)',
    challenge: 'A 10-ton rooftop package unit suffered catastrophic compressor burnout on a Monday morning in an occupied medical clinic.',
    solution: 'Coordinated emergency crane permits, rigged and lifted a new high-efficiency Daikin commercial RTU with zero disruption to patient appointments.',
    results: [
      { metric: '6 Hours', label: 'From crane arrival to cold air delivery' },
      { metric: '100% Uptime', label: 'Zero patient appointment cancellations' },
      { metric: '10-Year', label: 'Full commercial parts warranty registered' }
    ],
    systemType: '10-Ton High-Efficiency Rooftop Commercial RTU'
  }
];

export const GENERAL_FAQS = [
  {
    question: 'How quickly can a technician arrive at my Austin home for an emergency repair?',
    answer: 'For emergency outages during extreme heat or freezing weather, our average dispatch time across North Austin, Round Rock, and Pflugerville is between 45 and 90 minutes. You will receive an SMS confirmation with your technician’s name, photo, and live tracking.'
  },
  {
    question: 'What are the payment and financing options available?',
    answer: 'We accept all major credit cards, checks, and ACH. For new system replacements and major repairs, we partner with top HVAC lenders to provide flexible financing options, including 0% APR promotional terms for up to 60 months for approved applicants.'
  },
  {
    question: 'Are all your technicians licensed and background-checked?',
    answer: 'Yes. Every technician at HVAC Express Contracting LLC is registered with the Texas Department of Licensing and Regulation (TDLR TACLA #84921E), EPA 608 Universal Certified, background checked, and drug screened.'
  },
  {
    question: 'What areas in Central Texas do you service?',
    answer: 'We service Greater Austin and surrounding Williamson & Travis County areas, including North Austin, Wells Branch, Round Rock, Pflugerville, Cedar Park, Georgetown, Leander, Mueller, The Domain, and Westlake.'
  },
  {
    question: 'Do you offer free estimates on new HVAC installations?',
    answer: 'Yes! We provide complimentary, no-obligation in-home estimates for new system replacements, including ACCA Manual J load calculations and a clear comparison of equipment options.'
  }
];
