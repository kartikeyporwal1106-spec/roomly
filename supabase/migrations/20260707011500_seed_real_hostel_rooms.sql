-- Seed real room numbers from Hostelallotment.xlsx without importing student names.
-- The same room inventory is available separately for boys and girls.

DO $$
DECLARE
  hostel_record RECORD;
  floor_record RECORD;
  floor_rooms TEXT[];
  room_no TEXT;
BEGIN
  INSERT INTO public.hostels (hostel_name, gender)
  VALUES
    ('Boys Hostel', 'male'),
    ('Girls Hostel', 'female')
  ON CONFLICT (hostel_name) DO UPDATE SET gender = EXCLUDED.gender;

  -- Remove the old sample hostels only where no student profile uses their rooms.
  DELETE FROM public.rooms r
  USING public.floors f, public.hostels h
  WHERE r.floor_id = f.id
    AND f.hostel_id = h.id
    AND h.hostel_name IN ('Aravali', 'Nilgiri', 'Shivalik', 'Vindhya')
    AND NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.room_id = r.id);

  DELETE FROM public.floors f
  USING public.hostels h
  WHERE f.hostel_id = h.id
    AND h.hostel_name IN ('Aravali', 'Nilgiri', 'Shivalik', 'Vindhya')
    AND NOT EXISTS (SELECT 1 FROM public.rooms r WHERE r.floor_id = f.id);

  DELETE FROM public.hostels h
  WHERE h.hostel_name IN ('Aravali', 'Nilgiri', 'Shivalik', 'Vindhya')
    AND NOT EXISTS (SELECT 1 FROM public.floors f WHERE f.hostel_id = h.id);

  FOR hostel_record IN
    SELECT id FROM public.hostels WHERE hostel_name IN ('Boys Hostel', 'Girls Hostel')
  LOOP
    FOR floor_record IN
      SELECT * FROM (VALUES
        (0, ARRAY['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']::TEXT[]),
        (1, ARRAY['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132']::TEXT[]),
        (2, ARRAY['201','202','203','204','205','206','207','208','209','210','211','212','213','214','215','216','217','218','219','220','221','222','223','224','225','226','227','228','229','230','231','232']::TEXT[])
      ) AS floors(floor_number, rooms)
    LOOP
      INSERT INTO public.floors (hostel_id, floor_number)
      SELECT hostel_record.id, floor_record.floor_number
      WHERE NOT EXISTS (
        SELECT 1 FROM public.floors
        WHERE hostel_id = hostel_record.id AND floor_number = floor_record.floor_number
      );

      SELECT floor_record.rooms INTO floor_rooms;

      FOREACH room_no IN ARRAY floor_rooms LOOP
        INSERT INTO public.rooms (floor_id, room_number, capacity)
        SELECT f.id, room_no, 2
        FROM public.floors f
        WHERE f.hostel_id = hostel_record.id
          AND f.floor_number = floor_record.floor_number
        LIMIT 1
        ON CONFLICT (floor_id, room_number) DO UPDATE SET capacity = EXCLUDED.capacity;
      END LOOP;
    END LOOP;
  END LOOP;
END $$;
